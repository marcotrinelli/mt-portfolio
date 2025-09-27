import React from "react";
import Header from "../../components/header/Header";
import Hobbies from "../../containers/hobbies/Hobbies";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";

const HobbiesComponent = (): JSX.Element => {
  return (
    <div>
      <Header />
      <Hobbies />
      <Footer />
      <TopButton />
    </div>
  );
};

export default HobbiesComponent;
