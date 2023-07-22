import React, { useCallback, useEffect, useRef, useState } from 'react';
import Col from 'react-bootstrap/Col';

import { Structure } from '../../interfaces/target-config';

import './Canvas.css';

interface CanvasProps {
  width: number;
  height: number;
  structures: Structure[];
}

interface CanvasImage {
  name: string;
  file: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isDragging: boolean;
  dragX: number;
  dragY: number;
  image: HTMLImageElement;
}

const Canvas: React.FC<CanvasProps> = ({ width, height, structures }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dragok, setDragok] = useState(false);
  const [images, setImages] = useState<CanvasImage[]>([]);

  // clear the canvas
  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, width, height);
  }, [width, height]);

  const draw = useCallback(
    (images: CanvasImage[]) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      if (!context) return;

      clearCanvas();

      for (const canvasImage of images) {
        // const image = new Image();

        // image.onload = () => {
        //   canvasImage.width = image.width;
        //   canvasImage.height = image.height;

        //   context.drawImage(image, canvasImage.x, canvasImage.y);
        // };

        // image.onerror = (e) => {
        //   console.log('Error loading image', e);
        // };

        // image.crossOrigin = 'anonymous';
        // image.src = `https://raw.githubusercontent.com/PlaceDE-Official/pixel/main/pictures/${canvasImage.file}`;

        context.drawImage(canvasImage.image, canvasImage.x, canvasImage.y);
      }
    },
    [clearCanvas]
  );

  useEffect(() => {
    // const images: CanvasImage[] = [];
    const promises: Promise<CanvasImage>[] = [];

    for (const structure of structures) {
      promises.push(
        new Promise((resolve) => {
          // if (structure.name === 'netherlands') continue;

          const image = new Image();

          image.onload = () => {
            resolve({
              name: structure.name,
              file: structure.file,
              x: structure.startx + 1000,
              y: structure.starty + 500,
              isDragging: false,
              width: image.width,
              height: image.height,
              dragX: 0,
              dragY: 0,
              image: image,
            });
          };

          image.onerror = (e) => {
            console.log('Error loading image', e);
          };

          image.crossOrigin = 'anonymous';
          image.src = `https://raw.githubusercontent.com/PlaceDE-Official/pixel/main/pictures/${structure.file}`;
        })
      );
    }

    Promise.all(promises).then((images) => {
      setImages(images);
      draw(images);
    });
  }, [structures, draw]);

  function mouseDown(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const BB = canvas.getBoundingClientRect();
    const offsetX = BB.left;
    const offsetY = BB.top;

    // get the current mouse position
    const mx = e.clientX - offsetX;
    const my = e.clientY - offsetY;

    // test each rect to see if mouse is inside
    setDragok(false);

    for (const image of images) {
      if (
        mx > image.x &&
        mx < image.x + image.width &&
        my > image.y &&
        my < image.y + image.height
      ) {
        // if yes, set that rects isDragging=true
        setDragok(true);
        image.isDragging = true;
        image.dragX = mx - image.x;
        image.dragY = my - image.y;
      }
    }
  }

  function mouseMove(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    // if we're dragging anything...
    if (dragok) {
      // tell the browser we're handling this mouse event
      e.preventDefault();
      e.stopPropagation();

      const canvas = canvasRef.current;
      if (!canvas) return;

      const BB = canvas.getBoundingClientRect();
      const offsetX = BB.left;
      const offsetY = BB.top;

      // get the current mouse position
      const mx = e.clientX - offsetX;
      const my = e.clientY - offsetY;

      // move each rect that isDragging
      // by the distance the mouse has moved
      // since the last mousemove
      for (const structure of images) {
        if (structure.isDragging) {
          structure.x = mx - structure.dragX;
          structure.y = my - structure.dragY;
        }
      }

      // redraw the scene with the new rect positions
      draw(images);
    }
  }

  function mouseUp(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // clear all the dragging flags
    setDragok(false);

    for (const structure of images) {
      structure.isDragging = false;
    }
  }

  return (
    <Col md='7'>
      <div className='canvas-container'>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onMouseDown={mouseDown}
          onMouseMove={mouseMove}
          onMouseUp={mouseUp}
        />
      </div>
    </Col>
  );
};

export default Canvas;
