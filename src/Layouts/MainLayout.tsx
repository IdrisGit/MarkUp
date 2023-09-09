import { Outlet } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import ThemeSwitch from '../components/shared/ThemeSwitch/ThemeSwitch';

const MainLayout = () => {
  return (
    <Container>
      <Row>
        <Col className='d-flex justify-content-end pb-md-3'>
          <ThemeSwitch />
        </Col>
      </Row>
      <Row>
        <Outlet />
      </Row>
    </Container>
  );
};

export default MainLayout;
