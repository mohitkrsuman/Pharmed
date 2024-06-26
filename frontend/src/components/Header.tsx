import { useEffect, useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { user } from "../types/types";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../firebase";

interface PropsType{
  user: user | null
}

const Header = ({user}: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandler = async() => {
    try{
       await signOut(auth);
       toast.success("Sign out successfully");
       setIsOpen(false);
    }catch(err){
       toast.error("Sign out fail");
    }
  };

  return (
    <nav className="header">
      <div className="pharmedTitle">
        <Link to="/">PHAR<span>MED</span><FaPlus/>+</Link>
      </div>
      <div className="pharmedLinks">
        <Link onClick={() => setIsOpen(false)} to="/">
          HOME
        </Link>
        <Link onClick={() => setIsOpen(false)} to="/search">
          <FaSearch />
        </Link>
        <Link onClick={() => setIsOpen(false)} to="/cart">
          <FaShoppingBag />
        </Link>

        {user?._id ? (
          <>
            <button onClick={() => setIsOpen(!isOpen)}>
              <FaUser />
            </button>
            <dialog open={isOpen}>
              <div>
                {user?.role === "admin" && (
                  <Link to="/admin/dashboard">Admin</Link>
                )}
                <Link to="/orders">Orders</Link>
                <button onClick={logoutHandler}>
                  <FaSignOutAlt />
                </button>
              </div>
            </dialog>
          </>
        ) : (
          <Link to={"/login"}>
            <FaSignInAlt />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
