// importējam axios lai varētu veikt API pieprasījumus
import axios from 'axios'

// importējam bootstram komponentes
// https://react-bootstrap.netlify.app/getting-started/introduction/
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

// importējam json ar visām pasaules valstīmn
import {countryList} from './constants/countries'

// importējam css lai būtu bootstrap elementiem stils
import 'bootstrap/dist/css/bootstrap.min.css';
// importējam useState hooku lai varētu lik komponentēm pārzīmēties kad tiek dabūti jauni dati
import { useState } from 'react';

function App() {
  // state kurā noteiksim vai lapa ladējās vai nelādējās
  const [loading, setLoading] = useState(false)
  // state kur glabāsim datus par universitātēm
  const [universities, setUniversities] = useState([])
  // state priekš inputiem
  const [countryInputValue, setCountryInputValue] = useState('')
  const [nameInputValue, setNameInputValue] = useState('')

  return (
    <Container>
      <Form 
        className='mt-3 mb-3' 
        onSubmit={(e) => {
          // neļaujam formai pārlādēt labu uz submit
          e.preventDefault();

          // pasakam, ka lapa tagad lādējās
          setLoading(true)

          // iztīram vecos datus
          setUniversities([])

          axios.get(`http://universities.hipolabs.com/search?country=${countryInputValue}&name=${nameInputValue}`).then((res) => {
            // iesetojam atrastos datus
            setUniversities(res.data)
            // pasakam, ka lapa vairs nelādējās
            setLoading(false)
          })
        }}
      >
        <Row className="justify-content-md-center">
          <Col xs={6}>
            <Row>
              <Col xs={5}>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter university name"
                    value={nameInputValue}
                    minLength="3"
                    onChange={(e) => {
                      setNameInputValue(e.target.value)
                    }}
                    required
                  />
              </Col>
              <Col xs={5}> 
              <Form.Select
                value={countryInputValue}
                onChange={(e) => {
                  setCountryInputValue(e.target.value)
                }}
              >
                {/* Uzliekam placeholder optionu */}
                <option disabled value="">Select country</option>
                {/* Uzģenerējam selec optionu katrai valstij */}
                {countryList.map((country) => {
                  return (<option key={Math.random()} value={country}>{country}</option>)
                })}
              </Form.Select>
              </Col>
              <Col xs={2}>
                <Button 
                  type="submit" 
                  variant='warning'
                  disabled={loading}
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col>
          <Table striped bordered>
            <tbody>
              <tr>
                <th>University name</th>
                <th>University country</th>
                <th>University webpage</th>
              </tr>
              {/* zīmējam tabulu ar universitātēm */}
              {universities.map((universitiy) => {
                return (
                  <tr key={Math.random()}>
                    <td>{universitiy.name}</td>
                    <td>{universitiy.country}</td>
                    <td>
                      {universitiy.web_pages.map((domain) => {
                          return (
                            <>
                              <Button 
                                key={Math.random()}
                                href={domain} 
                                target="_blank"
                              >
                                Homepage
                              </Button>{' '}
                            </>
                          )
                      })}
                    </td>
                  </tr>
                )
              })}
          </tbody>
          </Table>
          {/* šo mēs rādam, ja universitātēm state ir tukšs */}
          {!universities.length && !loading && <h1 className='text-center'>
            Nothing to show please use search to find universities
          </h1>}
          {/* spinnerīši ja lapa atrodas loading state */}
          {loading && (
           <Row>
              <Col className='text-center'>
                <Spinner animation="grow" variant="primary" />{' '}
                <Spinner animation="grow" variant="secondary" />{' '}
                <Spinner animation="grow" variant="success" />{' '}
                <Spinner animation="grow" variant="danger" />{' '}
                <Spinner animation="grow" variant="warning" />{' '}
                <Spinner animation="grow" variant="info" />{' '}
                <Spinner animation="grow" variant="light" />{' '}
                <Spinner animation="grow" variant="dark" />
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
