import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesProvider";
import Button from "./Button";
import styles from "./City.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
  function City() {
    const { id } = useParams();
    const trimmedId = id.trim();
    const { getCity, currentCity  } = useCities();
    const navigate = useNavigate();
    useEffect(
      function () {
        getCity(trimmedId);
      },
      [trimmedId,getCity]
    );
  
    const { cityName, emoji, date, notes } = currentCity;
  
  
  
    return (
      <div className={styles.city}>
        <div className={styles.row}>
          <h6>City name</h6>
          <h3>
            <span>{emoji}</span> {cityName}
          </h3>
        </div>
  
        <div className={styles.row}>
          <h6>You went to {cityName} on</h6>
          <p>{formatDate(date || null)}</p>
        </div>
  
        {notes && (
          <div className={styles.row}>
            <h6>Your notes</h6>
            <p>{notes}</p>
          </div>
        )}
  
        <div className={styles.row}>
          <h6>Learn more</h6>
          <a
            href={`https://en.wikipedia.org/wiki/${cityName}`}
            target="_blank"
            rel="noreferrer"
          >
            Check out {cityName} on Wikipedia &rarr;
          </a>
        </div>
  
        <div>
        <div className={styles.buttons}>
       
       
<Button onclick={(e) => {
  e.preventDefault();
  navigate(-1)
}} type="back"> &larr; back</Button>
          </div>
          
        </div>
      </div>
    );
  }
  
  export default City;
  

