import React from 'react';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import { useTargetConfig } from '../../context';
import { Structure } from '../../interfaces/target-config';

import './Artwork.css';

interface ArtworkProps {
  structure: Structure;
}

const Artwork: React.FC<ArtworkProps> = ({ structure }) => {
  const [targetConfig, setTargetConfig] = useTargetConfig();

  function select() {
    targetConfig.structure.forEach((s) => (s.selected = false));
    const s = targetConfig.structure.find(
      (s) => s.name === structure.name && s.file === structure.file
    );

    if (s) {
      s.selected = true;
      console.log(s);
    }

    setTargetConfig(targetConfig);
  }

  return (
    <Row className={'artwork' + (structure.selected ? ' selected' : '')} onClick={select}>
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
