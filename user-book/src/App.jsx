import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './NavBar'
import ImageSlider from './ImageSlider'
import HomeCard from './HomeCard'
function App() {


  return (
    <Container fluid>
      <Row>
        <Col>
          <NavBar></NavBar>
        </Col>
      </Row>
      <Row>
        <Col>
          <ImageSlider></ImageSlider>
        </Col>
      </Row>
      <Row>
        <HomeCard></HomeCard>
      </Row>
    </Container>
  )
}

export default App
