import axios from 'axios';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import toml from 'toml';
// import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';

import { Structure, TargetConfig } from './interfaces/target-config';

import ArtworkList from './components/artworks/ArtworkList';
import Canvas from './components/canvas/Canvas';
import Metadata from './components/metadata/Metadata';

import './App.css';

const targetConfigUrl =
  'https://raw.githubusercontent.com/PlaceDE-Official/pixel/main/target_config.toml';

function App() {
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const [structures, setStructures] = useState<Structure[]>([]);

  useEffect(() => {
    axios.get(targetConfigUrl).then((res) => {
      try {
        const targetConfig: TargetConfig = toml.parse(res.data);

        console.log(targetConfig);

        setCanvasWidth(targetConfig.width);
        setCanvasHeight(targetConfig.height);
        setStructures(targetConfig.structure);
      } catch (err) {
        console.log(err);
      }
    });
  }, []);

  return (
    <>
      <Navbar expand='lg' className='bg-body-tertiary'>
        <Container fluid>
          <Navbar.Brand>PlaceDE Pixel</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          {/* <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='#home'>Home</Nav.Link>
              <Nav.Link href='#link'>Link</Nav.Link>
              <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
                <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
                <NavDropdown.Item href='#action/3.2'>Another action</NavDropdown.Item>
                <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='#action/3.4'>Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse> */}
        </Container>
      </Navbar>
      <Container fluid className='pixel-container'>
        <Row className='p-3'>
          <Canvas width={canvasWidth} height={canvasHeight} structures={structures} />
          <ArtworkList structures={structures} />
          <Metadata />
        </Row>
      </Container>
    </>
  );
}

export default App;
