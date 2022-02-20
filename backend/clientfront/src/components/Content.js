import React, { useState, useEffect } from "react";
import "../styles/Content.css";

function Content() {
  const url =
    "http://localhost:5001/web-cat-test/us-central1/app/api/readallpersons";
  const [persona, setPersonas] = useState();

  const fetchApi = async () => {
    const respuesta = await fetch(url);
    console.log(respuesta.status);
    const respuestaJSON = await respuesta.json();
    setPersonas(respuestaJSON);
    console.log(respuestaJSON);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div>
      {!persona
        ?<p className="alert_load">Loading all data </p>
        : persona.map((persona,index) => {
            return (
              <div>
                <ul className="tilesWrap">
                  <li>
                    <h2>{index}</h2>
                    <h3>{persona.name}</h3>
                    <p>
                      Age:
                      {persona.age}
                      <br/>
                      Birth:
                      {persona.dayOfBirth}
                      <br/>
                      Country:
                      {persona.country}
                      <br/>
                      Vehicle:
                      {persona.vehicle}
                    </p>
                    <button>Read more</button>
                  </li>
                </ul>
              </div>
            );
          })}
    </div>
  );
}

export default Content;
