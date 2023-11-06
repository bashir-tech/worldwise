import { Link } from "react-router-dom"

function Home() {
    return (
        <header>
            <Link to="/"> home</Link>
            <Link to="/price"> price</Link>
            <Link to="/product"> product</Link>
     </header>
    )
}

export default Home
