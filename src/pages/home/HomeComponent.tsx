import React from "react";
import SeoHeader from "../../components/seoHeader/SeoHeader";
import Greeting from "../../containers/greeting/Greeting";
import Skills from "../../containers/skills/Skills";
import StartupProject from "../../containers/StartupProjects/StartupProject";
import Footer from "../../components/footer/Footer";

const Home = (): JSX.Element => {
  return (
    <div>
      <SeoHeader />
      <Greeting />
      <Skills />
      <StartupProject />
      <Footer />
    </div>
  );
};

export default Home;
