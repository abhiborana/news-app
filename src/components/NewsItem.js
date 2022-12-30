import React from "react";

const Newsitem = (props)=>{


    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    // let imageUrlLog = console.log(imageUrl)

    return (
      <>
        <div className="my-3 container">
          <div className="card">
            <img
              src={
                imageUrl
                  ? imageUrl
                  : "https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png"
              }
              className="card-img-top"
              alt={title}
            />

            <div className="card-body">
              <h5 className="card-title">
                {title}
                <a
                  role={"button"}
                  href={newsUrl}
                  target="_blank"
                  className="position-absolute newsHeader top-0 translate-middle badge rounded-pill bg-danger"
                  style={{ left: "85%", zIndex: "1" }}
                >
                  {source}
                </a>
              </h5>
              <p className="card-text">{description}...</p>
              <p className="card-text">
                <small className="text-muted">
                  By -{author ? author : "Unknown"} On{" "}
                  {new Date(date).toGMTString().slice(0, 16)}
                </small>
              </p>
              <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
                Read More
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }


export default Newsitem;
