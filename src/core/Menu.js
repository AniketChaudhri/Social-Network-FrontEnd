import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { signout, isAuthenticated } from "../auth/index";

const isActive = (history, path) => {
    // if (history.location.pathname === path) {
    //     return {color: "#ff9900"};
    // }
    return { color: "#00fff8" };
}

const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs mb-3 bg-primary" id="ex1" role="tablist">
            <li className="nav-item" role="presentation">
                <Link className="nav-link" style={isActive(history, "/")} to="/">Home</Link>
            </li>
            {!isAuthenticated() && (
                <>
                    <li className="nav-item" role="presentation">
                        <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">Sign Up</Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">Sign In</Link>
                    </li>
                </>
            )}
            {isAuthenticated() && (
                <>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" style={(isActive(history, "/signin"), { cursor: "pointer", color: "#fff" })} onClick={() => signout(() => history.push('/'))}>Sign Out</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link">{isAuthenticated().user.name}</a>
                </li>
                </>
                
            )}
            
        </ul>

        {/* {()=>console.log(JSON.stringify(props))} */}
    </div>
)

export default withRouter(Menu);