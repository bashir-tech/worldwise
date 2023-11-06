import { useNavigate } from "react-router-dom";
import Button from "./Button";
function BackButton() {

    const navigate = useNavigate();
    return (
        <div className={styles.buttons}>
       
       
         <Button onclick={(e) => {
           e.preventDefault();
           navigate(-1)
         }} type="back">back</Button>
       </div>
      
    )
}

export default BackButton
