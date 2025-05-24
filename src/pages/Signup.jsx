import React, { useState } from "react";
import { auth, db } from "../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider, // Import GoogleAuthProvider
  signInWithPopup, // Import signInWithPopup
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc, Timestamp } from "firebase/firestore"; // Import Firestore methods

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // For user name input
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      // Create a user using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signed up user:", userCredential.user);

      // Create a document in the 'users' collection in Firestore for storing user settings/preferences
      const user = userCredential.user;
      const userRef = doc(db, "users", user.uid); // The doc ID will be the user's Firebase UID

      // Store user data with preferences and creation timestamp
      await setDoc(userRef, {
        uid: user.uid,
        name: name, // The user-provided name
        email: email, // The email from the signup form
        preferred_weekly_day: "Monday", // Default to Monday if not provided
        preferred_monthly_day: "1", // Default to 1st of the month if not provided
        created_at: Timestamp.now(), // Timestamp when the user signed up
      });

      // Navigate to home after successful signup
      navigate("/home");
    } catch (err) {
      console.error("Signup error:", err.message);
      // You might want to display a user-friendly error message here, e.g., using a state variable
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      // Check if user document already exists (e.g., if they previously signed up with email and now use Google)
      // Or if they are a new Google user, create their document.
      // For signup, we assume they are new, but this check is good practice.
      // If the user already exists, we navigate. If not, we create the document.
      // The `signInWithPopup` itself handles linking if email exists.
      const docSnap = await getDoc(userRef); // Need to import getDoc from firestore

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName || "", // Get name from Google profile
          email: user.email, // Get email from Google profile
          preferred_weekly_day: "Monday",
          preferred_monthly_day: "1",
          created_at: user.metadata.creationTime, // Use Google user's creation time
        });
      }

      navigate("/home");
    } catch (error) {
      console.error("Google sign-in error:", error.message);
      // Handle errors like pop-up closed, etc.
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
          margin-bottom: 15px; /* Keep some margin for the Google button */
        }

        .login-button:hover {
          background-color: #43a047;
          box-shadow: 0 6px 20px rgba(67,160,71,0.6);
        }

        .google-button { /* Re-added Google button styles */
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
          margin-bottom: 25px; /* Margin below Google button */
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
      <div className="login-container" role="main" aria-label="Signup form">
        <div className="logo" aria-hidden="true"></div>
        <h2>Sign Up</h2>
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
        <input
          type="text" // Corrected: Comment outside the attribute
          className="input-field"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Name"
          required
        />
        <button className="login-button" onClick={handleSignup} aria-label="Sign Up">Sign Up</button>
        <button className="google-button" onClick={handleGoogleSignIn} aria-label="Sign up with Google">
          Sign up with Google
        </button>
        <p className="signup-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </>
  );
}

export default Signup;