import React, { useState } from "react";
import { auth, db } from "../config/firebase-config";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: "",
          email: email,
          preferred_weekly_day: "Monday",
          preferred_monthly_day: "1",
          created_at: user.metadata.creationTime,
        });
      }

      navigate("/home");
    } catch (err) {
      console.error("Login error:", err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName || "",
          email: user.email,
          preferred_weekly_day: "Monday",
          preferred_monthly_day: "1",
          created_at: user.metadata.creationTime,
        });
      }

      navigate("/home");
    } catch (error) {
      console.error("Google sign-in error:", error.message);
    }
  };

  return (
    <>
      <style>{`
        body, html {
          height: 100%;
          margin: 0;
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #4caf50 0%, #2196f3 100%);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .login-container {
          background: white;
          padding: 40px 30px 40px 30px;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          width: 350px;
          text-align: center;
        }

        .logo {
          width: 60px;
          height: 60px;
          margin: 0 auto 25px auto;
          border: 3px solid #4caf50;
          border-radius: 50%;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .logo::before {
          content: "";
          position: absolute;
          width: 22px;
          height: 34px;
          background: #4caf50;
          clip-path: polygon(50% 0%, 90% 40%, 70% 100%, 30% 100%, 10% 40%);
          top: 13px;
          left: 19px;
          border-radius: 4px;
        }

        h2 {
          margin-top: 0;
          margin-bottom: 30px;
          font-weight: 600;
          color: #333;
          letter-spacing: 0.03em;
        }

        .input-field {
          width: 100%;
          padding: 14px 16px;
          border-radius: 10px;
          border: 1.8px solid #ccc;
          margin-bottom: 20px;
          font-size: 16px;
          transition: border-color 0.3s ease;
          outline: none;
        }

        .input-field:focus {
          border-color: #4caf50;
          box-shadow: 0 0 6px rgba(76,175,80,0.5);
        }

        .login-button {
          width: 100%;
          padding: 14px 0;
          border: none;
          border-radius: 10px;
          background-color: #4caf50;
          color: white;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(76,175,80,0.4);
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          margin-bottom: 15px;
        }

        .login-button:hover {
          background-color: #43a047;
          box-shadow: 0 6px 20px rgba(67,160,71,0.6);
        }

        .google-button {
          width: 100%;
          padding: 14px 0;
          border-radius: 10px;
          border: 2px solid #2196f3;
          background-color: white;
          color: #2196f3;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: none;
          transition: background-color 0.3s ease, color 0.3s ease;
          margin-bottom: 25px;
        }

        .google-button:hover {
          background-color: #2196f3;
          color: white;
        }

        .signup-link {
          font-size: 14px;
          color: #666;
        }

        .signup-link a {
          color: #4caf50;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .signup-link a:hover {
          color: #388e3c;
          text-decoration: underline;
        }
      `}</style>
      <div className="login-container" role="main" aria-label="Login form">
        <div className="logo" aria-hidden="true"></div>
        <h2>Login</h2>
        <input
          type="email"
          className="input-field"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email"
          required
        />
        <input
          type="password"
          className="input-field"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Password"
          required
        />
        <button className="login-button" onClick={handleLogin} aria-label="Login">Login</button>
        <button className="google-button" onClick={handleGoogleSignIn} aria-label="Sign in with Google">
          Sign in with Google
        </button>
        <p className="signup-link">
          Haven’t created an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </>
  );
}

export default Login;

