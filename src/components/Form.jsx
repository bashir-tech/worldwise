// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "./Button";
import styles from "./Form.module.css";
import SpinnerFullPage from "./SpinnerFullPage";

import { useCities } from "../contexts/CitiesProvider";
import Message from "./Message";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}


function Form() {
  const [searchParams] = useSearchParams()
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
  
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setemoji] = useState("");
  const [isLoadingGeoCoding, setiIsLoadingGeoCoding] = useState(false);
  let url = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  const { createCity,isLoading } = useCities();
  async function handleSubmit(e) {
    e.preventDefault();
    if(!cityName && !date) return
    const newCity = {
      cityName,
      country,
      emoji,
    
      date,
      notes,
      position: {
        lat,
      lng,
      },
    }

   await createCity(newCity);
    navigate("/app")
  }
  useEffect(function () {
    if(!lat && !lng) return
    async function fetchCityData() {
      try {
        setiIsLoadingGeoCoding(true);
        const res = await fetch(`${url}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.countryCode)
          <Message message="that doesn't seem to be a city. please click
          somewhere else 😊"/>
         
        setCityName(data.city || data.locality|| "");
        setCountry(data.countryCode)
        setemoji(convertToEmoji(data.countryCode))
        
        
      
       
          
      } catch (error) {
        console.log(error);
      } finally {
        setiIsLoadingGeoCoding(false)
      }
    }
    fetchCityData();
  }, [lat,lng]);



  if (isLoadingGeoCoding) return <SpinnerFullPage />

  if(!lat && !lng)  return <Message message="✋🏽start clicking somewhere on the map "/>
  return (
    <form className={`${ styles.form } ${ isLoading ? styles.loading : " " }`}
    onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          
          id="cityName"

          onChange={(e) => setCityName(e.target.value)}

          value={cityName}
          
        />
      <span className={styles.flag}>{emoji}</span>
      </div>
      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
        dateFormat={"dd-mm-yyyy"}/>
      </div>
      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>
      <div className={styles.buttons}>
      <Button onclick={handleSubmit} type="primary">Add</Button>
        <Button onclick={(e) => {
          e.preventDefault();
          navigate(-1);
        }} type="back">&larr; back </Button>
      </div>
    </form>
  );
}

export default Form;
