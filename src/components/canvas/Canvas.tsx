import React, { useCallback, useEffect, useRef, useState } from 'react';
import Col from 'react-bootstrap/Col';

import { useTargetConfig } from '../../context';

import './Canvas.css';

interface CanvasProps {}

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
  locked?: boolean;
}

const Canvas: React.FC<CanvasProps> = () => {
  const [targetConfig] = useTargetConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dragok, setDragok] = useState(false);
  const [images, setImages] = useState<CanvasImage[]>([]);

  // clear the canvas
  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, targetConfig.width, targetConfig.height);
  }, [targetConfig.height, targetConfig.width]);

  const draw = useCallback(
    (images: CanvasImage[]) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      if (!context) return;

      clearCanvas();

      for (const canvasImage of images) {
        context.drawImage(canvasImage.image, canvasImage.x, canvasImage.y);
      }
    },
    [clearCanvas]
  );

  useEffect(() => {
    const promises: Promise<CanvasImage>[] = [];

    for (const structure of targetConfig.structure) {
      promises.push(
        new Promise((resolve, reject) => {
          const image = new Image();

          image.onload = () => {
            resolve({
              name: structure.name,
              file: structure.file,
              x: structure.startx + targetConfig['add-x'],
              y: structure.starty + targetConfig['add-y'],
              isDragging: false,
              width: image.width,
              height: image.height,
              dragX: 0,
              dragY: 0,
              image: image,
              locked: !structure.selected,
            });
          };

          image.onerror = (err) => {
            reject(err);
          };

          image.crossOrigin = 'anonymous';
          image.src = `https://raw.githubusercontent.com/PlaceDE-Official/pixel/main/pictures/${structure.file}`;
        })
      );
    }

    Promise.all(promises).then(
      (images) => {
        setImages(images);
        draw(images);
      },
      (err) => {
        console.log('Error loading image(s)', err);
      }
    );
  }, [draw, targetConfig]);

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

    setDragok(false);

    // test each image to see if mouse is inside
    for (const image of images) {
      if (
        mx > image.x &&
        mx < image.x + image.width &&
        my > image.y &&
        my < image.y + image.height &&
        !image.locked
      ) {
        // if yes, set that images isDragging=true
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

      // move each image that isDragging
      // by the distance the mouse has moved
      // since the last mousemove
      for (const image of images) {
        if (image.isDragging) {
          image.x = mx - image.dragX;
          image.y = my - image.dragY;
        }
      }

      // redraw the scene with the new image positions
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
          width={targetConfig.width}
          height={targetConfig.height}
          onMouseDown={mouseDown}
          onMouseMove={mouseMove}
          onMouseUp={mouseUp}
        />
      </div>
    </Col>
  );
};

export default Canvas;
