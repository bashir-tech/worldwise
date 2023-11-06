import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
const CitiesContext = createContext();
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ""
  
}

function reducer(state, action) {
  
  switch (action.type) {
    case "loading": return {
    ...state, isLoading:true
    }
  
   
      case "cities/loaded": return {
        ...state, isLoading:false,cities: action.payload
      }
      case "city/loaded":
        return { ...state, isLoading: false, currentCity: action.payload };
     case "city/created": return {
    ...state, isLoading:false, cities:[...state.cities,action.payload]
    }
    case "city/deleted": return {
      ...state, isLoading:false, cities:state.cities.filter((city) => city.id !== action.payload)
    }
    case "rejected":
      return {
        ...state, isLoading: false,
        error:action.payload
      }
    default:
      throw new Error("unknow action type")
   }
 }
  

function CitiesProvider({children}) {

  

  const  [{cities,isLoading,currentCity,error},dispatch]  = useReducer(reducer,initialState);
  // const [cities, setCities] = useState([]);
  // const [currentCity, setCurrentCity] = useState({});
  //   const [isLoading, setisLoading] = useState(false);
  const url = "http://localhost:8000";
  useEffect(function () {
    async function fetchCity() {
  dispatch({type:"loading"})
      try {
  
        const res = await fetch(`${ url }/cities`);
        const data = await res.json();
        console.log(data)
      dispatch({type:"cities/loaded",payload:data})
      }
      catch {
        dispatch({type:"rejected",payload: " there was an error loading  data"})
        
      }
      
    }
    
    fetchCity();
  
  }, []);


 const getCity=useCallback( async function getCity(id) {
    if(Number(id)===currentCity.id) return
    dispatch({type:"loading"})
    try {
      const res = await fetch(`${url}/cities/${id}`);
    
        const data = await res.json();
     dispatch({type:"city/loaded",payload:data})
    
    } catch (error) {
      dispatch({type:"rejected",payload:" there was an error getting  city..."})
    }
  },[currentCity.id])
  
  
  async function createCity(newCity) {
    dispatch({type:"loading"})
    try {
      const res = await fetch(`${ url }/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-Type":"application/json"
        }
      });
     
      const data = await res.json();
      dispatch({type:"city/created",payload:data})
       console.log(data)
      
    } catch (error) {
      dispatch({type:"rejected",payload: alert(" there was an error creating  city...")})
    
    }
  }
  
  
  async function DeleteCity(id) {
    dispatch({type:"loading"})
    try {
      const res = await fetch(`${ url }/cities/${id}`, {
        method: "DELETE",
       
      });
     
    
      dispatch({type:"city/deleted",payload:id})

      
    } catch (error) {
      dispatch({type:"rejected",payload: alert(" there was an error deleting   city...")})

    }
  }
  
  
    
    return (
        <CitiesContext.Provider
            value={{
          cities,
          isLoading,
          currentCity,
          getCity,
          createCity,
          DeleteCity,
          error
          
        }}
        >
            {children}
        </CitiesContext.Provider>
    )
}

function useCities() {
    const context = useContext(CitiesContext);

  if (context === undefined) 
      throw new Error("outside of the city provider")
    return context;
}

export { CitiesProvider, useCities };

