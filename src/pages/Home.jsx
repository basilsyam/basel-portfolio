import Hero from "../components/Hero/Hero";
import Intro from "../components/Intro/Intro";
import SelectedWork from "../components/SelectedWork/SelectedWork";
import ContactCTA from "../components/ContactCTA/ContactCTA";

const Home = () => {
  return (
    <main>
      <Hero />
      <Intro />
      <SelectedWork />
      <ContactCTA />
    </main>
  );
};

export default Home;
