import React from "react";

interface Props {
  title: string;
  description: string;
  imgUrl: string;
  newsUrl: string;
  mode: "light" | "dark";
  time: string;
  author: string;
  source: string;
}

const NewsItem: React.FC<Props> = ({
  title,
  description,
  imgUrl,
  newsUrl,
  mode,
  time,
  author,
  source,
}) => {
  return (
    <div className={`my-3`}>
      <div className="card">
        <span
          className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
          style={{ left: "86%", zIndex: "1" }}
        >
          {source}
        </span>

        <img src={imgUrl} className="card-img-top" alt="News" />

        <div className={`card-body bg-${mode}`}>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>

          <p className="card-text">
            <small className="text-mutated">
              {`By ${author ? author : "Unknown"} on ${
                time ? new Date(time).toUTCString() : "Unknown"
              }`}
            </small>
          </p>

          <a
            href={newsUrl}
            target="_blank"
            className={`btn btn-${mode === "dark" ? "primary" : "dark"} btn-sm`}
            rel="noreferrer"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
