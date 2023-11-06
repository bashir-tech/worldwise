import styles from './CountryItem.module.css';

function CountryItem({coun,index}) {
    const { emoji ,country} = coun;
    return (
        <li className={styles.countryItem}> 
            
            
          
        <span>{emoji} </span>
        </li>
    )
}

export default CountryItem
