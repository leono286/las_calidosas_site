import { useEffect, useState } from 'react';

function preloadImage(src: string) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.style.display = 'none';
    image.onload = () => {
      document.body.removeChild(image);
      resolve(image);
    };
    image.onerror = image.onabort = function () {
      reject(src);
    };
    document.body.appendChild(image);
  });
}

export default function useImagePreloader(imageList: string[]) {
  const [imagesPreloaded, setImagesPreloaded] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;

    async function effect() {
      console.log('PRELOAD');

      if (isCancelled) {
        return;
      }

      const imagesPromiseList: Promise<any>[] = [];
      for (const i of imageList) {
        imagesPromiseList.push(preloadImage(i));
      }

      await Promise.all(imagesPromiseList);

      if (isCancelled) {
        return;
      }

      setImagesPreloaded(true);
    }

    effect();

    return () => {
      isCancelled = true;
    };
  }, [imageList]);

  return { imagesPreloaded };
}
