import React, { useEffect, useState } from "react";

export default function Cmts(props) {
  const [cmts, setCmts] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [cmtsOnSearch, setCmtsOnSearch] = useState([]);

  const handleChange = (e) => {
    if (e.target.value) {
      e.preventDefault();
      setCmtsOnSearch(
        cmts.filter((student) => student.idbook.includes(e.target.value))
      );
    } else {
      setCmtsOnSearch(cmts);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (
      window.confirm(`Are you sure to delete cmt ${e.target.dataset.id}`) === true
    ) {
      
      fetch(`http://localhost:8080/cmts/delete/${e.target.dataset.id}`, {
        method: "DELETE",
      })
        .then((response) => response.text())
        .then((data) => {
          alert(data);
          setDeleted(!deleted);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    fetch("http://localhost:8080/cmts")
      .then((response) => response.json())
      .then((data) => {
        setCmts(data);
        setCmtsOnSearch(data);
      })
      .catch((err) => console.log(err));
  }, [deleted]);

  return (
    <form id="formCmt" className="mx-8" >
      {cmts.map((cmt) => (
        <div key={cmt.id}>
          <div className="container my-1 py-1 text-dark" >
            <div className="row d-flex justify-content-center">
              <div className="col-md-8 col-lg-5 col-xl-5">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="d-flex flex-start">
                      <img className="rounded-circle shadow-1-strong me-3"
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(26).webp" alt="avatar" width="40"
                        height="40" />
                      <div className="w-100">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6 className="text-primary fw-bold mb-0">
                            {cmt.username}
                            <span className="text-dark ms-2">{cmt.cmt}</span>
                          </h6>
                          <button data-id={cmt.id} onClick={handleDelete} className="btn btn-danger">Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </form>
  );
}
