import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userAction";
import { Dropdown } from "react-bootstrap";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged Out Successfully");
  };

  const customDropdownStyle = {
    minWidth: "200px",
  };

  return (
    <nav className="navbar row sticky-top">
      <div className="col-12 col-md-3">
        <Link to="/">
          <img src="/images/logo.webp" alt="logo" className="logo" />
        </Link>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <div className="input-group">
          <input
            type="text"
            id="search_field"
            className="form-control"
            placeholder="Search Your Favorite Restaurant...."
          />
          <div className="input-group-append">
            <button id="search_btn" className="btn">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-3 mt-2 mt-md-0">
        <div className="d-flex justify-content-end align-items-center">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span className="ml-3" id="cart">
              Cart
            </span>
            <span className="ml-1" id="cart_count">
              {cartItems.length}
            </span>
          </Link>

          {user ? (
            <div className="ml-4 d-inline">
              <Dropdown style={customDropdownStyle}>
                <Dropdown.Toggle
                  variant="light"
                  id="userDropdown"
                  className="btn text-black"
                >
                  <figure className="avatar avatar-nav">
                    <img
                      src={user.avatar && user.avatar.url}
                      alt={user && user.name}
                      className="rounded-circle"
                    />
                  </figure>
                  <span>{user && user.name}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu style={customDropdownStyle}>
                  <Dropdown.Item as={Link} to="/eats/orders/me/myOrders">
                    Orders
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/users/me">
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="text-danger"
                    onClick={logoutHandler}
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            !loading && (
              <Link to="/users/login" className="btn ml-4" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
