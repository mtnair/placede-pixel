import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import { Structure } from '../../interfaces/target-config';

import './Artwork.css';

interface ArtworkProps {
  structure: Structure;
}

const Artwork: React.FC<ArtworkProps> = ({ structure }) => {
  return (
    <Row className='artwork'>
      <Col md='4' className='artwork-image'>
        <Image
          src={`https://raw.githubusercontent.com/PlaceDE-Official/pixel/main/pictures/${structure.file}`}
        />
      </Col>
      <Col md='8' className='artwork-details'>
        <p>Name: {structure.name}</p>
        <p>Prio: {structure.priority}</p>
        <p>
          X: {structure.startx}, Y: {structure.starty}
        </p>
      </Col>
    </Row>
  );
};

export default Artwork;
