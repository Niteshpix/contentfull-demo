import React, { useEffect, useState } from "react";
import { admin, client } from "../config/client";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { formatInTimeZone } from "date-fns-tz";

function Posts() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const [author, setAuthor] = useState();
  let space_id = process.env.REACT_APP_CONTENTFUL_SPACE_ID;

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
    admin
      .getSpace(space_id)
      .then((space) => {
        space
          .getSpaceUsers()
          .then((users) => {
            const activatedUsers = users?.items?.filter(
              (user) => user?.activated
            );
            setAuthor(activatedUsers);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

    // admin
    //   .getSpace(space_id)
    //   .then((space) => space.getEnvironment("master-2023-04-12"))
    //   .then((environment) => environment.getEntries())
    //   .then((response) => {
    //     let data = response.items;
    //     setPublishBy(data);
    //   })
    //   .catch(console.error);

    fetchEntries();
  }, [space_id]);

  const handleClick = (id) => {
    navigate(`/post/${id}`);
  };
  //console.log(articles);

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
                    <Card.Title>{art.fields.name}</Card.Title>
                    {author &&
                      author.slice(0, 1).map((author, i) => {
                        return (
                          <div
                            key={i}
                            className="author"
                            style={{
                              display: "flex",
                              textAlign: "start",
                            }}
                          >
                            <Card.Img
                              variant="top"
                              src={author?.avatarUrl}
                              style={{
                                height: "28px",
                                width: "28px",
                                borderRadius: "50%",
                              }}
                            />
                            <h6 style={{ marginLeft: "4px", marginTop: "4px" }}>
                              {author.firstName}
                              <span> {dateFormat(art?.sys?.updatedAt)}</span>
                            </h6>
                          </div>
                        );
                      })}
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
