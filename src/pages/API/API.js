import { useEffect } from "react";
import to from "await-to-js";
import axios from "axios";

const API = () => {
  useEffect(() => {
    const fetchData = async () => {
      const [error, response] = await to(
        axios.get("https://rickandmortyapi.com/api/character/")
      );
      if (error) {
        alert("failed to pull");
      } else {
        return response.data.results;
      }
    };

    fetchData();
  }, []);
};

export default API;
