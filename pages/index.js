import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

import styles from "../styles/Home.module.css";
import Twitter from "../components/Twitter";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Twitter</title>
        <meta name="description" content="Crud contracat" />
      </Head>

      <Twitter />
    </div>
  );
}
