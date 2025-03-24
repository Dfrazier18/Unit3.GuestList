import { useState, useEffect } from "react";

const BASE_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/DEMO";
const API = BASE_URL + COHORT;

/**
 * useQuery is a custom hook that allows us to reuse a lot of the logic
 * involved with fetching different resources from an API.
 */
export default function useQuery(resource) {
  /** The data being queries from the API */
  const [data, setData] = useState();

  /** Whether or not we're still waiting for a response from the API */
  const [loading, setLoading] = useState(false);

  /** In case something goes wrong with the API call */
  const [error, setError] = useState(null);

  // We use the useEffect to isolate the side effect of talking to an API
  // as well as making sure that the query only happens if the resource changes
  useEffect(() => {
    const query = async () => {
      // Reset loading and error when we first start fetching data
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API + resource);
        if (!response.ok) throw Error("Sorry! Something went wrong :(");
        const result = await response.json();
        // Update the data state if everything goes well...
        setData(result.data);
      } catch (e) {
        console.error(e);
        // ... or set the error if something goes wrong
        setError(e.message);
      } finally {
        // But regardless, we have now received a response from the API
        setLoading(false);
      }
    };
    query();
  }, [resource]);

  return { data, loading, error };
}
