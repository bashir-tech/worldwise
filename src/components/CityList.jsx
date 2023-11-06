
import { useCities } from '../contexts/CitiesProvider';
import CityItem from './CityItem';
import styles from './CityList.module.css';
import Message from './Message';
import Spinner from "./Spinner";
function CityList() {
    const { cities, isLoading } = useCities();
    if (isLoading) return <Spinner />
    if(!cities.length) return <Message message=" Add your first city"/>
    return (
        <ul className={styles.cityList}>
     
      
      
       {cities.map((city,index)=><CityItem city={city} key={index} />)}
            
            
          
        </ul>
    )
    
}


export default CityList
