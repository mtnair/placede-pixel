import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';

import ArtworkList from './components/artworks/ArtworkList';
import Canvas from './components/canvas/Canvas';
import Metadata from './components/metadata/Metadata';
import { TargetConfigProvider } from './context';

import './App.css';

function App() {
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
      <TargetConfigProvider>
        <Container fluid className='pixel-container'>
          <Row className='p-3'>
            <Canvas />
            <ArtworkList />
            <Metadata />
          </Row>
        </Container>
      </TargetConfigProvider>
    </>
  );
}

export default App;
