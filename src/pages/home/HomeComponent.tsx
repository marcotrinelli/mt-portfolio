import React from "react";
import Header from "../../components/header/Header";
import Greeting from "../../containers/greeting/Greeting";
import Skills from "../../containers/skills/Skills";
import StartupProject from "../../containers/StartupProjects/StartupProject";
import Footer from "../../components/footer/Footer";

const Home = (): JSX.Element => {
  return (
    <div>
      <Header />
      <Greeting />
      <Skills />
      <StartupProject />
      <Footer />
    </div>
  );
};

export default Home;
