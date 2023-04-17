import { useState } from "react";
import { admin } from "../config/client";

export function FeedbackForm(props) {
  let { postid } = props;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
    rating: "",
    postid,
  });
  let space_id = process.env.REACT_APP_CONTENTFUL_SPACE_ID;
  const requiredFields = ["name", "email", "rating"];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isFormValid = requiredFields.every((field) => formData[field]);
    if (!isFormValid) {
      alert("Please fill in all required fields.");
      return;
    }
    const entry = {
      fields: {
        name: { "en-US": formData.name },
        email: { "en-US": formData.email },
        comment: { "en-US": formData.comment },
        rating: { "en-US": formData.rating },
        postid: { "en-US": formData.postid },
      },
    };
    try {
      await admin
        .getSpace(space_id)
        .then((space) => space.getEnvironment("master-2023-04-12"))
        .then((environment) => environment.createEntry("feedback", entry));
      alert("Thank you for your feedback!");
      setFormData({
        name: "",
        email: "",
        comment: "",
        rating: "",
        postid: postid,
      });
    } catch (error) {
      console.error("Error occurred:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div style={{ padding: "10px", marginTop: "65px", width: "30%" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ fontSize: "24px", textAlign: "center" }}>Feedback Form</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ marginBottom: "8px", fontSize: "14px" }}>
              Name *
            </span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ marginBottom: "8px", fontSize: "14px" }}>
              Email *
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ marginBottom: "8px", fontSize: "14px" }}>
              Comment
            </span>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              style={{
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                resize: "vertical",
                minHeight: "100px",
              }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ marginBottom: "8px", fontSize: "14px" }}>
              Rating *
            </span>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              style={{
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              <option value="">Select a rating</option>
              <option value="1">1 Start</option>
              <option value="2">2 Start</option>
              <option value="3">3 Start</option>
              <option value="4">4 Start</option>
              <option value="5">5 Start</option>
            </select>
          </label>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="submit"
            style={{
              padding: "12px 24px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
