export type CompressionProgress = (progress: number, message: string) => void;

export const FIXED_TARGET_KB = 20;
export const MAX_SIZE_BYTES = 20 * 1024;
export const UNDER_20KB_ERROR = "We couldn’t compress this image under 20KB. Try a smaller or simpler image.";

export type CompressionOutcome = {
  blob: Blob;
  originalBytes: number;
  compressedBytes: number;
  targetBytes: number;
  mimeType: string;
  formatLabel: string;
  extension: string;
  width: number;
  height: number;
  quality: number;
  scale: number;
};

type DrawableImage = {
  source: CanvasImageSource;
  width: number;
  height: number;
  close: () => void;
};

type Candidate = {
  blob: Blob;
  width: number;
  height: number;
  quality: number;
  scale: number;
};

const SUPPORTED_TYPES = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"]);
const MIN_ACCEPTABLE_QUALITY = 0.34;
const MAX_QUALITY = 0.92;
const MAX_RESIZE_ROUNDS = 18;
const QUALITY_SEARCH_ROUNDS = 9;
const RESIZE_STEP = 0.86;
const MIN_LONG_EDGE = 120;

export function isSupportedImage(file: File) {
  const lowerName = file.name.toLowerCase();
  return (
    SUPPORTED_TYPES.has(file.type) ||
    lowerName.endsWith(".jpg") ||
    lowerName.endsWith(".jpeg") ||
    lowerName.endsWith(".png") ||
    lowerName.endsWith(".webp")
  );
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(kb >= 100 ? 0 : 1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

export function getSavedPercentage(originalBytes: number, compressedBytes: number) {
  if (!originalBytes) return 0;
  return Math.max(0, (1 - compressedBytes / originalBytes) * 100);
}

export function isWithinMaxSize(bytes: number) {
  return bytes <= MAX_SIZE_BYTES;
}

export async function compressImageToTarget(
  file: File,
  targetKb: number,
  onProgress?: CompressionProgress
): Promise<CompressionOutcome> {
  if (!isSupportedImage(file)) {
    throw new Error("Please upload a JPG, PNG, or WebP image.");
  }

  const targetBytes = Math.max(1, Math.round(targetKb * 1024));
  onProgress?.(4, "Reading your image locally");
  const image = await loadImage(file);

  try {
    if (file.size <= targetBytes) {
      onProgress?.(100, `Your image is already under ${Math.round(targetBytes / 1024)}KB`);
      return {
        blob: file,
        originalBytes: file.size,
        compressedBytes: file.size,
        targetBytes,
        mimeType: normalizedMime(file),
        formatLabel: formatLabelForMime(normalizedMime(file)),
        extension: extensionForMime(normalizedMime(file)),
        width: image.width,
        height: image.height,
        quality: 1,
        scale: 1
      };
    }

    const outputMime = chooseOutputMime(file);
    let scale = 1;
    const totalRounds = MAX_RESIZE_ROUNDS * QUALITY_SEARCH_ROUNDS;
    let completedRounds = 0;

    for (let resizeRound = 0; resizeRound < MAX_RESIZE_ROUNDS; resizeRound += 1) {
      let low = MIN_ACCEPTABLE_QUALITY;
      let high = MAX_QUALITY;
      let bestForScale: Candidate | null = null;

      for (let qualityRound = 0; qualityRound < QUALITY_SEARCH_ROUNDS; qualityRound += 1) {
        const quality = (low + high) / 2;
        const candidate = await renderCandidate(image, outputMime, quality, scale);

        completedRounds += 1;
        const progress = Math.min(96, 8 + Math.round((completedRounds / totalRounds) * 88));
        onProgress?.(progress, `Trying to stay under ${Math.round(targetBytes / 1024)}KB`);

        if (candidate.blob.size <= targetBytes) {
          bestForScale = candidate;
          low = quality;
        } else {
          high = quality;
        }
      }

      if (bestForScale) {
        onProgress?.(100, "Compression complete");
        return {
          blob: bestForScale.blob,
          originalBytes: file.size,
          compressedBytes: bestForScale.blob.size,
          targetBytes,
          mimeType: bestForScale.blob.type || outputMime,
          formatLabel: formatLabelForMime(bestForScale.blob.type || outputMime),
          extension: extensionForMime(bestForScale.blob.type || outputMime),
          width: bestForScale.width,
          height: bestForScale.height,
          quality: bestForScale.quality,
          scale: bestForScale.scale
        };
      }

      const nextLongEdge = Math.max(image.width, image.height) * scale * RESIZE_STEP;
      if (nextLongEdge < MIN_LONG_EDGE) {
        break;
      }

      scale *= RESIZE_STEP;
    }

    throw new Error(
      targetBytes === MAX_SIZE_BYTES
        ? UNDER_20KB_ERROR
        : `We couldn’t compress this image under ${Math.round(targetBytes / 1024)}KB. Try a smaller or simpler image.`
    );
  } finally {
    image.close();
  }
}

async function loadImage(file: File): Promise<DrawableImage> {
  if ("createImageBitmap" in window) {
    try {
      const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
      return {
        source: bitmap,
        width: bitmap.width,
        height: bitmap.height,
        close: () => bitmap.close()
      };
    } catch {
      // Fall back to HTMLImageElement below for browsers or files that do not support createImageBitmap.
    }
  }

  const dataUrl = await readAsDataUrl(file);
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("This image could not be opened in your browser."));
    img.src = dataUrl;
  });

  return {
    source: image,
    width: image.naturalWidth || image.width,
    height: image.naturalHeight || image.height,
    close: () => undefined
  };
}

function readAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("This image could not be read."));
    reader.readAsDataURL(file);
  });
}

async function renderCandidate(
  image: DrawableImage,
  mimeType: string,
  quality: number,
  scale: number
): Promise<Candidate> {
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d", { alpha: mimeType !== "image/jpeg" });
  if (!context) {
    throw new Error("Canvas is not available in this browser.");
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  if (mimeType === "image/jpeg") {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
  } else {
    context.clearRect(0, 0, width, height);
  }

  context.drawImage(image.source, 0, 0, width, height);
  const blob = await canvasToBlob(canvas, mimeType, quality);

  return {
    blob,
    width,
    height,
    quality,
    scale
  };
}

function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("The compressed image could not be created."));
          return;
        }
        resolve(blob);
      },
      mimeType,
      quality
    );
  });
}

function chooseOutputMime(file: File) {
  const sourceMime = normalizedMime(file);
  const preferred = sourceMime === "image/webp" || sourceMime === "image/png" ? "image/webp" : "image/jpeg";
  if (canvasSupportsMime(preferred)) return preferred;
  return "image/jpeg";
}

function canvasSupportsMime(mimeType: string) {
  if (mimeType === "image/jpeg") return true;
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL(mimeType).startsWith(`data:${mimeType}`);
}

function normalizedMime(file: File) {
  if (file.type === "image/jpg") return "image/jpeg";
  if (file.type) return file.type;

  const lowerName = file.name.toLowerCase();
  if (lowerName.endsWith(".webp")) return "image/webp";
  if (lowerName.endsWith(".png")) return "image/png";
  return "image/jpeg";
}

function formatLabelForMime(mimeType: string) {
  if (mimeType === "image/webp") return "WebP";
  if (mimeType === "image/png") return "PNG";
  return "JPEG";
}

function extensionForMime(mimeType: string) {
  if (mimeType === "image/webp") return "webp";
  if (mimeType === "image/png") return "png";
  return "jpg";
}
