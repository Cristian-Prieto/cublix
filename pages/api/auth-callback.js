// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { API_KEY } from "../../utils/requests";
export default async function handler(req, res) {
  const {
    query: { request_token, approved },
  } = req;

  if (approved) {
    const response = await fetch(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}&request_token=${request_token}`
    ).then((res) => res.json());

    const sessionId = response.session_id;
    console.log("[STEP 3]: created sessionId:", sessionId);

    res.redirect(`/account/auth/?session_id=${sessionId}`);
  } else {
    res.status(500).json({
      error: true,
      message: "Algo salió mal.",
    });
  }

  // console.log(req.query.request_token);
}
