import axios from "axios";
// import { response } from "express";
import { useEffect, useState } from "react";

export function useFetchData(url) {
  const [data, setData] = useState([url]);

  useEffect(() => {
    if (!url) {
      return;
    }

    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);

  return data;
}

