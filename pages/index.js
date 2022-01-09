import { getSession } from "next-auth/react";
import Head from "next/head";
import Script from "next/script";
import Center from "../components/Center";
import Main from "../components/Main";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="tracking-wide text-sm bg-[#121212] h-screen overflow-hidden ">
      <Head>
        <title>Demo Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex">
        <Sidebar />
        <Main />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
      {/* <Script>{`window.onload = function() {
        var el = document.getElementsByClassName('unsupported');
        for(var i = 0; i < el.length; i++) {
            var anchor = el[i];
            anchor.onclick = function() {
                alert('This feature has not yet been implemented, sorry!');
            }
        }
    }`}</Script> */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
