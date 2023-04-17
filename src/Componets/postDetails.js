import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { client } from "../config/client";
import { Card } from "react-bootstrap";
import { marked } from "marked";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { FeedbackForm } from "./rating";
import Comment from "./comments";

function PostDetails() {
  const { id } = useParams();
  const [singlepost, setSinglePost] = useState();
  const [feedback, setFeedbcak] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPost() {
      try {
        client.getEntry(id).then(function (entry) {
          setSinglePost(entry.fields);
        });
        const response = await client.getEntries({
          content_type: "feedback",
        });
        setFeedbcak(response.items);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPost();
  }, [id]);

  if (!singlepost?.description) {
    return null;
  }

  const backArrowClick = () => {
    navigate("/");
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        className="post-wrapper"
        style={{ marginLeft: "100px", marginTop: "30px", width: "60%" }}
      >
        <div className={"d-flex align-center"}>
          <button
            className={"back_btn"}
            style={{
              background: "transparent",
              border: "none",
              display: "flex",
              alignitems: "center",
              marginTop: "10px",
            }}
            onClick={backArrowClick}
          >
            <AiOutlineDoubleLeft />
          </button>
          <h2 style={{ textAlign: "left" }}>
            Mouth-Watering Burgers king Recipe
          </h2>
        </div>

        <Card style={{ textAlign: "left", padding: "30px" }}>
          <section
            dangerouslySetInnerHTML={{
              __html: marked(singlepost?.description),
            }}
          />

          <Card.Img
            variant="top"
            src={singlepost?.image?.fields?.file?.url}
            style={{ height: "380px", width: "500px" }}
          />
        </Card>
        <div className="cmnts" style={{ padding: "30px" }}>
          {feedback
            ?.filter((comment) => comment.fields.postid === id)
            ?.map((comment, i) => (
              <div key={`comment-${i}`}>
                <h3>Feedback</h3>
                <Comment key={`comment-${i}`} {...comment.fields} />
              </div>
            ))}
        </div>
      </div>
      <FeedbackForm postid={id} />
    </div>
  );
}

export default PostDetails;
