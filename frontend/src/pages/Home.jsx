import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <Container fluid className={styles.home}>
      {/* Greeting */}
      <Row className="mb-4">
        <Col>
          <h2 className={styles.greeting}>Welcome back, Cynthia 🌟</h2>
          <p className={styles.subtext}>
            Here’s your wellness hub — quick access to all your supportive spaces.
          </p>
        </Col>
      </Row>

      {/* Grid of Feature Cards */}
      <Row className="gy-4">
        <Col md={4}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>Mood Tracker</Card.Title>
              <Card.Text>Log your mood and view your emotional trends.</Card.Text>
              <Link to="/mood">
                <Button variant="primary" className={styles.btn}>Go to Mood Tracker</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>Chat with Haven</Card.Title>
              <Card.Text>Your AI companion for mental wellness support.</Card.Text>
              <Link to="/chat">
                <Button variant="warning" className={styles.btn}>Open Chat</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>Journal</Card.Title>
              <Card.Text>Reflect and write down your thoughts daily.</Card.Text>
              <Link to="/journal">
                <Button variant="secondary" className={styles.btn}>Go to Journal</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>Goals</Card.Title>
              <Card.Text>Track habits like hydration, sleep, and exercise.</Card.Text>
              <Link to="/goals">
                <Button variant="success" className={styles.btn}>View Goals</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>Wellness</Card.Title>
              <Card.Text>Explore articles, grounding exercises, and external resources.</Card.Text>
              <Link to="/tips">
                <Button variant="info" className={styles.btn}>Explore Wellness</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>Self Love Roadmap</Card.Title>
              <Card.Text>Learn and practice self-love from the basics upward.</Card.Text>
              <Link to="/selfLove">
                <Button variant="danger" className={styles.btn}>Start Self Love</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Motivational Quote */}
      <Row className="mt-5">
        <Col>
          <Card className={styles.quoteCard}>
            <Card.Body>
              <blockquote className={styles.quote}>
                “You are enough, just as you are.” 💙
              </blockquote>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
