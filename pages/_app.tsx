import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MathJaxContext } from "better-react-mathjax";

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <MathJaxContext>
      <Component {...pageProps} />
    </MathJaxContext>
  </>
}

export default MyApp;
