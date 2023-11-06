import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesProvider";
import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city, index }) {
  const { currentCity,DeleteCity } = useCities();

  const { cityName, emoji, date, id, position } = city;

  function handledlete(e) {
  e.preventDefault();
   
    DeleteCity(id);
   

  }
  return (
    <li key={index} >
      <Link className={`${styles.cityItem} ${id===currentCity.id ?  styles["cityItem--active"]:""}`}
      to={` ${id}?lat=${position.lat}&lng=${position.lng} `}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}  onClick={handledlete}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
