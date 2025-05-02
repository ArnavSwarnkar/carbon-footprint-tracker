import { signOut } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  return (
    <div>
      <h2>Welcome to the Home Page!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
