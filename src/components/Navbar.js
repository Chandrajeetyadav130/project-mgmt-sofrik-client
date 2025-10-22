import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/authAction';
import { useEffect, useState, useRef } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
export default function Navbar() {
    const [mobile, setMobile] = useState(false);
    const [sidebar, setSideBar] = useState(false);
    const sidebarRef = useRef(null);
    const iconRef = useRef(null);

    // Detect screen size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1006) {
                setMobile(true);
            } else {
                setMobile(false);
                setSideBar(false); // close sidebar when switching to desktop
            }
        };

        handleResize(); // check on mount
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close sidebar on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target) &&
                iconRef.current &&
                !iconRef.current.contains(event.target)
            ) {
                setSideBar(false);
            }
        };
        if (sidebar) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sidebar]);
    // Prevent background scroll when sidebar is open
    useEffect(() => {
        if (sidebar) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        // cleanup on unmount
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [sidebar]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, token } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login'); // redirect to login page after logout
    };

    return (
        <nav
            className='nav'
        >
            <div>
                <Link to="/" className='links'>
                    Project Manager
                </Link>
            </div>
            {/* Hamburger icon for mobile */}
            {mobile && (
                <div className="menu-icon" ref={iconRef}>
                    {sidebar ? (
                        <IoMdClose size={30} onClick={() => setSideBar(false)} />
                    ) : (
                        <GiHamburgerMenu size={30} onClick={() => setSideBar(true)} />
                    )}
                </div>
            )}
            {/* Navigation menu for larger screens */}
            {!mobile && (
                <nav className="nav-menu">
                    <div className='navlist'>
                        {token ? (
                            <>
                                <span>👋 {user?.name || 'User'}</span>
                                <button
                                    className='logoutbtn'
                                    onClick={handleLogout}

                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className='login-reg'>Login</Link>
                                <Link to="/register" className='login-reg'>Register</Link>
                            </>
                        )}
                    </div>
                </nav>
            )}
            {/* Sidebar for mobile */}
            <div className={`sidebar ${sidebar ? 'open' : ''}`} ref={sidebarRef}>
                <div className='navlist'>
                    {token ? (
                        <>
                            <span>👋 {user?.name || 'User'}</span>
                            <button
                                className='logoutbtn'
                                onClick={handleLogout}

                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className='login-reg'>Login</Link>
                            <Link to="/register" className='login-reg'>Register</Link>
                        </>
                    )}
                </div>
            </div>



        </nav>
    );
}
