import React from "react";
import { Link } from "react-router-dom";

const { useEffect } = React;

interface Props {
  mode: "light" | "dark";
  countries: { label: string; code: string; imgUrl: string }[];
  setCountryCode: (countryCode: string) => void;
  setCountry: (country: string) => void;
  setCateroriesAvailable: (categoriesAvailable: boolean) => void;
}

const Home: React.FC<Props> = ({
  mode,
  countries,
  setCountryCode,
  setCountry,
  setCateroriesAvailable,
}) => {
  useEffect(() => {
    setCateroriesAvailable(false);
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <h1
        className={`text-center my-3 text-${
          mode === "light" ? "dark" : "light"
        }`}
        style={{ margin: "30px 0px" }}
      >
        Welcome to NewsNut
      </h1>
      <h4
        className={`text-center my-1 text-${
          mode === "light" ? "dark" : "light"
        }`}
      >
        Select a Country to view its headlines
      </h4>
      <div className="row">
        {countries.map((country) => {
          return (
            <div className="col-md-4" key={country.label}>
              <Link
                onClick={() => {
                  setCountryCode(country.code);
                  setCountry(country.label);
                  setCateroriesAvailable(true);
                }}
                to={`${country.code.toLowerCase()}/general`}
                style={{
                  display: "inline",
                  textDecoration: "none",
                  color: mode === "dark" ? "white" : "black",
                }}
              >
                <div>
                  <div className="my-3">
                    <div className={`card-body bg-${mode}`}>
                      <img
                        src={country.imgUrl}
                        className="card-img-top"
                        alt="Country Landscape"
                      />
                      <h5
                        className="card-title mt-3"
                        style={{ textAlign: "center" }}
                      >
                        {country.label}
                      </h5>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
