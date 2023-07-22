import React from 'react';
import Col from 'react-bootstrap/Col';

import { Structure } from '../../interfaces/target-config';
import Artwork from './Artwork';

import './ArtworkList.css';

interface ArtworkListProps {
  structures: Structure[];
}

const ArtworkList: React.FC<ArtworkListProps> = ({ structures }) => {
  return (
    <Col md='3' className='artwork-col'>
      <div className='artwork-list'>
        {structures
          .sort((a, b) => b.priority - a.priority)
          .map((s, id) => (
            <Artwork key={id} structure={s} />
          ))}
      </div>
    </Col>
  );
};

export default ArtworkList;
