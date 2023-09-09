import { Outlet } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';
import ThemeSwitch from '../components/shared/ThemeSwitch/ThemeSwitch';

const MainLayout = () => {
  const { theme } = useTheme();

  return (
    <Container
      className={`h-100 ${
        theme === 'dark' ? 'text-light' : 'text-dark'
      }`}
      style={{
        backgroundColor: theme === 'dark' ? '#3C3C3C' : '',
      }}
    >
      <Row>
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
