import { useEffect } from "react";
import to from "await-to-js";
import axios from "axios";

const API = (props) => {
  useEffect(() => {
    const fetchData = async () => {
      const [error, response] = await to(
        axios.get("https://rickandmortyapi.com/api/character/")
      );
      if (error) {
        alert("failed to pull");
      } else {
        props.pullData(response.data.results);
      }
    };

    fetchData();
  }, []);

  return;
};

export default API;
