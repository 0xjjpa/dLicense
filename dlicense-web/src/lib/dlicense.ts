import { GET_APPS_QUERY } from "../constants/queries";

export const getApps = async () => {
  return await fetch(
    "https://arweave.net/graphql",
    {
      method: "POST",
      body: JSON.stringify({
        query: GET_APPS_QUERY,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 10 }
    }
  ).then((res) => res.json());
}