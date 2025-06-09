import React from "react";
import { Outlet } from "react-router";

function About() {
  return (
    <div>
      <h1>About</h1>
      <p>Demo project showcasing the use of NodeJs, Express & Mongo</p>
      <p>That's pretty much </p>

      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ACTION</th>
            <th>URL</th>
            <th>HTTP</th>
            <th>BODY</th>
            <th>RESULT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ color: "blue" }}>READ</td>
            <td>/api/books</td>
            <td>GET</td>
            <td>Empty</td>
            <td>Return all books</td>
          </tr>
          <tr>
            <td style={{ color: "blue" }}>READ</td>
            <td>/api/books/:id</td>
            <td>GET</td>
            <td>Empty</td>
            <td>Return a single book</td>
          </tr>
          <tr>
            <td style={{ color: "green" }}>CREATE</td>
            <td>/api/books</td>
            <td>POST</td>
            <td>JSON</td>
            <td>Create a new book</td>
          </tr>
          <tr>
            <td style={{ color: "orange" }}>UPDATE</td>
            <td>/api/books/:id</td>
            <td>PUT</td>
            <td>JSON</td>
            <td>Update a book</td>
          </tr>
          <tr>
            <td style={{ color: "red" }}>DELETE</td>
            <td>/api/books/:id</td>
            <td>DELETE</td>
            <td>Empty</td>
            <td>Delete a book</td>
          </tr>
        </tbody>
      </table>

      <Outlet />
    </div>
  );
}

export default About;
