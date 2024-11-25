import Hero from '../components/Hero';
import Comparison from '../components/Comparison';
import Process from '../components/Process';
import WhyUs from '../components/WhyUs';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Hero />
      <Comparison />
      <Process />
      <WhyUs />
      <Footer />
    </div>
  );
}