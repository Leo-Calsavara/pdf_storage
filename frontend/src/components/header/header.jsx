import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };



    return(
        <header className="header">
            <div className="header_container">
                <div className="header_logo">
                    <Link to="/dashboard">PDF Manager</Link>
                </div>
                <nav className="header_nav">
                    <Link to="/dashboard/upload" className="nav_link">Upload de PDF</Link>
                </nav>
                <div className="logout">
                    <button className="logout_button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </header>
    );
}

export default Header;