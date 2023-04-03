import React, { useState, useEffect } from "react";
import axios from "axios";

const EditPage = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${window.location.pathname.split(
          "/"
        )[2]}`
      );
      setData(res.data);
    };
    fetchPost();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${window.location.pathname.split(
        "/"
      )[2]}`,
      data
    );
    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={data.title}
        onChange={handleChange}
        placeholder="title"
      />
      <input
        type="text"
        name="body"
        value={data.body}
        onChange={handleChange}
        placeholder="body"
      />
      <button type="submit">submit</button>
    </form>
  );
};

export default EditPage;