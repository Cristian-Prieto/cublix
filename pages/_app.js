import "../styles/globals.css";
import AppContextComponent from "../utils/myList";

function MyApp({ Component, pageProps }) {
  return (
    <AppContextComponent>
      <Component {...pageProps} />
    </AppContextComponent>
  );
}

export default MyApp;
