import { useCities } from '../contexts/CitiesProvider';
import CountryItem from './CountryItem';
import styles from './CountryList.module.css';

function CountyList() {
    const { cities } = useCities();
    const countries = cities.reduce((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country)) {
            return [...arr, { country: city.country, emoji: city.emoji }]
        }
        else
            return arr;
    },[])
    return (
        <ul className={styles.countryList}>
            {countries.map((coun,index) => <CountryItem  coun={coun} key={index} />)}
        </ul>
    )
}

export default CountyList
