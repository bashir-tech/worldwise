import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/AuthProvider";
import styles from "./Login.module.css";
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("bashka@example.com");
  const [password, setPassword] = useState("qwerty");

  const { LogIn, isAuthonicated, LogOut } = useAuth();
  
  const navigate = useNavigate();
  function HandleSubmit(e) {
    e.preventDefault();
    if (email && password) LogIn(email, password);

  
  }
  
  useEffect(function () {
    if(isAuthonicated) navigate("/app",{replace:true})
  },[isAuthonicated,navigate])
  return (
    <main className={styles.login}>
      <PageNav/>
      <form className={styles.form} onSubmit={HandleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">LogIn</Button>
        </div>
      </form>
    </main>
  );
}
