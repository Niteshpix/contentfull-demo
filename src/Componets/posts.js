import React, { useEffect, useState } from "react";
import { client } from "../config/client";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Posts() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEntries() {
      try {
        const response = await client.getEntries();
        setArticles(response.items);
      } catch (error) {
        console.log(error);
      }
    }

    fetchEntries();
  }, []);

  const handleClick = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div>
      <div
        className="post-wrapper"
        style={{ marginLeft: "100px", marginTop: "10px" }}
      >
        <div style={{ textAlign: "left" }}>
          <h1>
            Discover the Delicious World of Burger King Recipes - Unleash Your
            Inner Chef !
          </h1>
          <p>
            Simply Recipes is a trusted resource for home cooks with more than
            3,000 tested recipes, guides, and meal plans, drawing over 15
            million readers each month from around the world. We’re supported by
            a group of recipe developers,
            <br /> food writers, recipe and product testers, photographers, and
            other creative professionals.
          </p>
          <h2>Recent Posts</h2>
        </div>

        <Row>
          {articles.map((art) => {
            return (
              <Col sm={6} md={4} lg={3} key={art.fields.name}>
                <Card
                  onClick={() => handleClick(art?.sys?.id)}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Img
                    variant="top"
                    src={art.fields.image.fields.file.url}
                    style={{ height: "380px", width: "400px" }}
                  />
                  <Card.Body>
                    <Card.Title>{art.fields.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default Posts;
