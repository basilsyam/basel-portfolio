import Hero from "../components/Hero/Hero";
import Intro from "../components/Intro/Intro";
import SelectedWork from "../components/SelectedWork/SelectedWork";
import ContactCTA from "../components/ContactCTA/ContactCTA";

const Home = () => {
  return (
    <div>
      <Hero />
      <Intro />
      <SelectedWork />
      <ContactCTA />
    </div>
  );
};

export default Home;
