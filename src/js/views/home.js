import React, { useContext, useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom';
import axios from "axios";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        axios.get('https://swapi.dev/api/people/')
            .then(response => {
                setCharacters(response.data.results);
            })
            .catch(error => {
                console.log('Error getting fake data: ' + error);
            })

        axios.get('https://swapi.dev/api/planets/')
            .then(response => {
                setPlanets(response.data.results);
            })
            .catch(error => {
                console.log('Error getting fake data: ' + error);
            })
    }, []);


    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1 className="text-center mt-5">Characters</h1>
                    <div className="d-flex flex-row flex-nowrap overflow-auto">
                        {characters.map((character, index) => (
                            <Card style={{ width: '18rem', flex: 'none', margin: '10px' }} key={index}>
                                <Card.Body>
                                    <Card.Title>{character.name}</Card.Title>
                                    <Card.Text>
                                        Gender: {character.gender} <br />
                                        Hair Color: {character.hair_color} <br />
                                        Eye Color: {character.eye_color}
                                    </Card.Text>
                                    <Link to={{
                                        pathname: "/detail",
                                    }}>
                                        <Button onClick={() => actions.setDetailPage("Character", character)} variant="primary">Learn More</Button>
                                    </Link>
                                    <Button onClick={() => actions.addItemFromFavorites("Character", character)} variant="secondary" className="ml-2">♡</Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 className="text-center mt-5">Planets</h1>
                    <div className="d-flex flex-row flex-nowrap overflow-auto">
                        {planets.map((planet, index) => (
                            <Card style={{ width: '18rem', flex: 'none', margin: '10px' }} key={index}>
                                <Card.Body>
                                    <Card.Title>{planet.name}</Card.Title>
                                    <Card.Text>
                                        Population: {planet.population} <br />
                                        Terrain: {planet.terrain}
                                    </Card.Text>
                                    <Link to={{
                                        pathname: "/detail",
                                    }}>
                                        <Button onClick={() => actions.setDetailPage("Planet", planet)} variant="primary">Learn More</Button>
                                    </Link>
                                    <Button onClick={() => actions.addItemFromFavorites("Planet", planet)} variant="secondary" className="ml-2">♡</Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
