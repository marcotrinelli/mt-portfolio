import React from "react";
import Header from "../../components/header/Header";
import Hobbies from "../../containers/hobbies/Hobbies";
import Footer from "../../components/footer/Footer";

const HobbiesComponent = (): JSX.Element => {
  return (
    <div>
      <Header />
      <Hobbies />
      <Footer />
    </div>
  );
};

export default HobbiesComponent;
