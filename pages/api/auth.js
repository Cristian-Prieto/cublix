// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { API_KEY } from "../../utils/requests";
export default async function handler(req, res) {
  const response = await fetch(
    `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`
  ).then((res) => res.json());

  const requestToken = response.request_token;
  console.log("[STEP 1]: requestToken:", requestToken);

  const TMDB_REDIRECT_AUTH_URL = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/api/auth-callback`;
  console.log("[STEP 2]: redirecting to:", TMDB_REDIRECT_AUTH_URL);

  res.redirect(TMDB_REDIRECT_AUTH_URL);
}
