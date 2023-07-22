import React from 'react';
import Col from 'react-bootstrap/Col';

import { useTargetConfig } from '../../context';
import Artwork from './Artwork';

import './ArtworkList.css';

interface ArtworkListProps {}

const ArtworkList: React.FC<ArtworkListProps> = () => {
  const [targetConfig] = useTargetConfig();

  return (
    <Col md='3'>
      <div className='artwork-list'>
        {targetConfig.structure
          .sort((a, b) => b.priority - a.priority)
          .sort((a, b) => (a.disabled ? 1 : b.disabled ? -1 : 0))
          .map((s, id) => (
            <Artwork key={id} structure={s} />
          ))}
      </div>
    </Col>
  );
};

export default ArtworkList;
