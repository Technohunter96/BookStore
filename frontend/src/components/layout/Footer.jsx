import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <a
              href='https://github.com/Technohunter96/BookStore'
              target='_blank'
              rel='noopener noreferrer'
              className='github-icon cursor pointer'
            >
              <FaGithub size={24} />
            </a>
            <p>BookStore &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
