import React, { useState, useContext } from 'react';
import { NoteContext } from "../reducer/useContext";

import { Link } from 'react-router-dom';
function Navbar() {
    const [search, setSearch] = useState("");



    const { state, dispatch, searchnote } = useContext(NoteContext);

    function handleTitleChange(event: any) {
        // event.preventDefault();
        setSearch(event.target.value);
        // service.searchTitle(dispatch, search);
    }
    function handleSearch() {
        searchnote(dispatch, search);
    }
    const logOut = async () => {
        localStorage.clear();
        dispatch({ type: "LOGOUT_TOGGLE" })

    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">NOTES</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {state.isLoggedIn ? <li className="nav-item active">
                            <Link to='/notes'><a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a></Link>
                        </li> : null}
                        {/* <li className="nav-item">
                            <Link to='/login'><a className="nav-link" href="#">login</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/register'><a className="nav-link" href="#">Register</a></Link>
                        </li> */}
                        {state.isLoggedIn ? <li className="nav-item">
                            <Link to='/' onClick={() => logOut()}><a className="nav-link">logout</a></Link>
                        </li> : null}

                    </ul>
                    {state.isLoggedIn ? <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={handleTitleChange} />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={() => { handleSearch(); }}>Search</button>
                    </form> : null}
                </div>
            </nav>

        </>
    )
}

export default Navbar
