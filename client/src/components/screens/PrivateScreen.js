import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css";
import Profile from "../../view/Profile";

const PrivateScreen = props => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");


  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("http://localhost:8000/api/private",config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    
    <Profile/>
    
  );
};

export default PrivateScreen;
