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
    if (structure.disabled) return;

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

  const classes = ['artwork'];
  if (structure.selected) classes.push('selected');
  if (structure.disabled) classes.push('disabled');

  return (
    <Row className={classes.join(' ')} onClick={select}>
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
        {structure.disabled && (
          <p>
            <em>Disabled</em>
          </p>
        )}
      </Col>
    </Row>
  );
};

export default Artwork;
