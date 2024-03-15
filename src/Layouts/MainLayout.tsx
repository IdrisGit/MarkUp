import { Outlet, Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';
import ThemeSwitch from '../components/shared/ThemeSwitch/ThemeSwitch';
import Logo from '../../public/logo.svg?react';

const MainLayout = () => {
  // const { theme } = useTheme();

  return (
    <Container className={`h-100 ${'text-dark'}`}>
      <Row>
        <Col className='d-flex justify-content-start pt-2 p-md-3'>
          <Link to={'/'}>
            <Logo />
          </Link>
        </Col>
        <Col className='d-flex justify-content-end pt-2 p-md-3'>
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
