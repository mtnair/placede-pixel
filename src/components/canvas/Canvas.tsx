import { loadImage, createCanvas } from 'canvas';
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import { Structure } from '../../interfaces/target-config';

import './Canvas.css';

interface CanvasProps {
  width: number;
  height: number;
  structures: Structure[];
}

const Canvas: React.FC<CanvasProps> = ({ width, height, structures }) => {
  const [canvasUrl, setCanvasUrl] = useState<string>();

  useEffect(() => {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    const promises: Promise<void>[] = [];

    console.log(canvas, ctx);

    for (const structure of structures) {
      const url = `https://raw.githubusercontent.com/PlaceDE-Official/pixel/main/pictures/${structure.file}`;

      promises.push(
        new Promise((resolve) => {
          loadImage(url).then((img) => {
            img.crossOrigin = 'anonymous';
            img.onload = () => {
              ctx.drawImage(img, structure.startx, structure.starty);
              resolve();
            };
          });
        })
      );
    }

    Promise.all(promises).then(() => {
      setCanvasUrl(canvas.toDataURL());
    });
  }, [width, height, structures]);

  return (
    <Col md='7'>
      <div className='canvas'>{canvasUrl && <Image src={canvasUrl} crossOrigin='anonymous' />}</div>
    </Col>
  );
};

export default Canvas;
