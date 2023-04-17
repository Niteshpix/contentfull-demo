import React, { useEffect, useState } from "react";
import { client } from "../config/client";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { formatInTimeZone } from "date-fns-tz";

function Posts() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  const dateFormat = (date) => {
    return formatInTimeZone(date, "America/New_York", "dd MMM yyyy");
  };

  useEffect(() => {
    async function fetchEntries() {
      try {
        const response = await client.getEntries({
          content_type: "recipes",
        });
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
        </div>

        <Row style={{ width: "80%", marginLeft: "5%", marginTop: "5px" }}>
          <h2>Recent Posts</h2>
          {articles.map((art) => {
            return (
              <Col sm={6} md={4} lg={3} key={art.fields.name}>
                <Card
                  onClick={() => handleClick(art?.sys?.id)}
                  style={{ cursor: "pointer", width: "350px" }}
                >
                  <Card.Img
                    variant="top"
                    src={art.fields.image.fields.file.url}
                    style={{ height: "300px", width: "300px" }}
                  />
                  <Card.Body>
                    <Card.Title>{art.fields.title}</Card.Title>
                    <div
                      className="author"
                      style={{
                        display: "flex",
                        textAlign: "start",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={art.fields.avtar.fields.file.url}
                        style={{
                          height: "35px",
                          width: "35px",
                          borderRadius: "50%",
                        }}
                      />
                      <h6 style={{ marginLeft: "4px", marginTop: "6px" }}>
                        {art.fields.author}
                        <span> {dateFormat(art?.sys?.updatedAt)}</span>
                      </h6>
                    </div>
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
