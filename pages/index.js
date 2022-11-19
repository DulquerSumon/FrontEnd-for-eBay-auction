import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

import styles from "../styles/Home.module.css";
import Ebay from "../components/Ebay";

export default function Home() {
  return (
    <div class="bg-gradient-to-r h-screen from-green-300 to-blue-500 ...">
      <Head>
        <title>Ebay</title>
        <meta name="description" content="Ebay contract" />
      </Head>
      <Header />
      <Ebay />
    </div>
  );
}
