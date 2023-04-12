import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { client } from "../config/client";
import { Card } from "react-bootstrap";
import { marked } from "marked";
import { AiOutlineDoubleLeft } from "react-icons/ai";

function PostDetails() {
  const { id } = useParams();
  const [singlepost, setSinglePost] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPost() {
      client.getEntry(id).then(function (entry) {
        setSinglePost(entry.fields);
      });
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
    <div>
      <div
        className="post-wrapper"
        style={{ marginLeft: "100px", marginTop: "30px", width: "90%" }}
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
      </div>
    </div>
  );
}

export default PostDetails;
