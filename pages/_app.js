import "../styles/globals.scss";
import Background from "../components/Background";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Background />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
