import React from "react";
import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import "../styles/index.css";
import Navbar from "../components/Navbar";
import Head from "next/head";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Splash&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="preload" href="/favicon.ico" as="image" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <title>DevBox - A Web Based IDE</title>
      </Head>
      <SessionProvider session={session}>
        <ChakraProvider>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div className="flex flex-col min-h-screen">
            <div className="hidden md:block">
              <Navbar />
            </div>
            <div className="flex-grow">
              <Component {...pageProps} />
            </div>
            <div className="hidden md:block">
              <Footer />
            </div>
            <div className="block md:hidden fixed bottom-0 z-10 w-full">
              <Navbar />
            </div>
          </div>
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
