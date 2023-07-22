import json2toml from 'json2toml';
import React from 'react';
import Col from 'react-bootstrap/Col';

import { useTargetConfig } from '../../context';

import './Metadata.css';

const Metadata: React.FC = () => {
  const [targetConfig] = useTargetConfig();

  const config = { ...targetConfig };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config.structure = config.structure.map(({ selected, ...keepAttrs }) => keepAttrs);

  const toml = json2toml(config, { newlineAfterSection: true });
  return (
    <Col md='2'>
      <div className='metadata'>
        <pre>{toml}</pre>
      </div>
    </Col>
  );
};

export default Metadata;
