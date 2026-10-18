
import React from "react";

import NavBar from "../components/NavBar/NavBar";
import HeroSlider from "../components/HeroSlider/HeroSlider";
import HeroServices from "../components/IconLayout/HeroServices";

import Offers from "../components/Sections/Offers/Offers";
import OurFamilies from "../components/Sections/OurFamilies/OurFamilies";
import PatientCaring from "../components/Sections/PatientCaring/PatientCaring";
import Blogs from "../components/Sections/Blogs/Blogs";
import FAQs from "../components/Sections/FAQs/FAQs";
import DownloadApp from "../components/Sections/DownloadApp/DownloadApp";

import Footer from "../components/Footer/Footer";

function Home() {
  return (
    <>
      <NavBar />

      <main>
        <HeroSlider />

        <HeroServices />

        <Offers />

        <OurFamilies />

        <PatientCaring />

        <Blogs />

        <FAQs />

        <DownloadApp />
      </main>

      <Footer />
    </>
  );
}

export default Home;
