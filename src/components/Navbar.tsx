import React from "react";
import { Link } from "react-router-dom";

interface Props {
  mode: "light" | "dark";
  toggleMode: () => void;
  country: string;
  categoriesAvailable: boolean;
}

const Navbar: React.FC<Props> = ({
  mode,
  toggleMode,
  country,
  categoriesAvailable,
}) => {
  return (
    <div style={{ position: "sticky", top: "0", zIndex: "2" }}>
      <nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            NewsNut
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {categoriesAvailable && (
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={`/${country.toLowerCase()}/general`}
                  >
                    General
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={`/${country.toLowerCase()}/business`}
                  >
                    Business
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={`/${country.toLowerCase()}/entertainment`}
                  >
                    Entertainment
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={`/${country.toLowerCase()}/health`}
                  >
                    Health
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={`/${country.toLowerCase()}/science`}
                  >
                    Science
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={`/${country.toLowerCase()}/sports`}
                  >
                    Sports
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={`/${country.toLowerCase()}/technology`}
                  >
                    Technology
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div
          className={`form-check form-switch text-${
            mode === "light" ? "dark" : "light"
          } mx-2`}
        >
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            onClick={toggleMode}
            onChange={() => {}}
            checked={mode === "dark"}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Dark&nbsp;Mode
          </label>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
