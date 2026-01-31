const STORAGE_KEY = 'blackboard_canvas';
const SIZE_KEY = 'blackboard_canvas_size';

interface CanvasData {
  imageData: string;
  width: number;
  height: number;
}

export class CanvasPersister {
  private storageKey: string;
  private sizeKey: string;

  constructor(storageKey = STORAGE_KEY, sizeKey = SIZE_KEY) {
    this.storageKey = storageKey;
    this.sizeKey = sizeKey;
  }

  save(canvas: HTMLCanvasElement): boolean {
    try {
      const imageData = canvas.toDataURL('image/png');
      const sizeData = JSON.stringify({
        width: canvas.width,
        height: canvas.height,
      });

      localStorage.setItem(this.storageKey, imageData);
      localStorage.setItem(this.sizeKey, sizeData);
      return true;
    } catch (error) {
      console.warn('Failed to save canvas to localStorage:', error);
      return false;
    }
  }

  load(canvas: HTMLCanvasElement): Promise<CanvasData | null> {
    return new Promise((resolve) => {
      try {
        const imageData = localStorage.getItem(this.storageKey);
        const sizeDataStr = localStorage.getItem(this.sizeKey);

        if (!imageData || !sizeDataStr) {
          resolve(null);
          return;
        }

        const sizeData = JSON.parse(sizeDataStr) as { width: number; height: number };
        const img = new Image();

        img.onload = () => {
          canvas.width = sizeData.width;
          canvas.height = sizeData.height;

          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
          }

          resolve({
            imageData,
            width: sizeData.width,
            height: sizeData.height,
          });
        };

        img.onerror = () => {
          console.warn('Failed to load saved canvas image');
          resolve(null);
        };

        img.src = imageData;
      } catch (error) {
        console.warn('Failed to load canvas from localStorage:', error);
        resolve(null);
      }
    });
  }

  clear(): void {
    try {
      localStorage.removeItem(this.storageKey);
      localStorage.removeItem(this.sizeKey);
    } catch (error) {
      console.warn('Failed to clear canvas from localStorage:', error);
    }
  }
}

export const canvasPersister = new CanvasPersister();
