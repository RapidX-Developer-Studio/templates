import "./App.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "react-bootstrap";

function Table() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    async function getData() {
      const result = await axios(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${pageSize}`
      );

      setData(result.data);
      setTotalRecords(parseInt(result.headers["x-total-count"]));
      setTotalPages(Math.ceil(totalRecords / pageSize));
    }

    getData();
  }, [page, pageSize]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const searchData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="tableWrapper">
        <h4>
          Table Title{" "}
          <span id="i4gb">
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" className="svg-icon" id="itwg">
              <path
                d="M554.666667 562.133333l138.368-138.325333 60.330666 60.330667L512 725.504l-241.365333-241.365333 60.330666-60.330667L469.333333 562.133333V85.333333h85.333334v476.8zM170.666667 682.666667h85.333333v170.666666h512v-170.666666h85.333333v170.666666c0 46.933333-38.4 85.333333-85.333333 85.333334H256c-46.933333 0-85.333333-41.088-85.333333-85.333334v-170.666666z"
                fill="#000000"
              ></path>
            </svg>
          </span>
        </h4>
        <div className="d-flex justify-content-end mb-3">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              onChange={handleSearch}
            />
          </div>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>
                  <button className="btn btn-primary mr-2" onClick={() => handleEdit(item)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-end">
          <Pagination className="my-3" size="sm" bsSize="medium">
            <Pagination.Prev
              disabled={page === 1 ? true : false}
              onClick={() => handlePageChange(page - 1)}
            />
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === page ? true : false}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={page === totalPages ? true : false}
              onClick={() => handlePageChange(page + 1)}
            />
          </Pagination>
        </div>
      </div>
      {Object.keys(editItem).length > 0 && <EditPage item={editItem} />}
    </div>
  );
}

function EditPage({ item }) {
  const handleSubmit = () => {
    //Submit request here
  };

  return (
    <div>
      <h4>Edit Page</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" value={item.title} />
        </div>
        <div className="form-group">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Table;