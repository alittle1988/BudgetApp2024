import { useState } from "react";

function useFetch(baseUrl) {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  async function get(url) {
    setLoading(true);
    try {
      const response = await fetch(baseUrl + url);
      const data = await response.json();
      setResults(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function post(url, body) {
    setLoading(true);
    try {
      const response = await fetch(baseUrl + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      setResults(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      
    }
  }

  async function put(url, body) {
    setLoading(true);
    try {
      const response = await fetch(baseUrl + url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      setResults(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function remove(url, body) {
    setLoading(true);
    try {
      const response = await fetch(baseUrl + url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response;
      setLoading(false);
      
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  }
  return { get, post, put, remove, results, loading };
}

export default useFetch;
