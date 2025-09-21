import React from "react";
import Header from "../../components/header/Header";
import Greeting from "../../containers/greeting/Greeting";
import Skills from "../../containers/skills/Skills";
import Education from "../../containers/education/Education";
import WorkExperience from "../../containers/workExperience/WorkExperience";
import StartupProject from "../../containers/StartupProjects/StartupProject";
import Achievement from "../../containers/achievement/Achievement";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";

const Home = (): JSX.Element => {
  return (
    <div>
      <Header />
      <Greeting />
      <Skills />
      <Education />
      <WorkExperience />
      <StartupProject />
      <Achievement />
      <Footer />
      <TopButton />
    </div>
  );
};

export default Home;
