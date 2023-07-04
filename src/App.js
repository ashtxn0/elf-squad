import logo from './elf-icon-green.svg';
import './App.css';
import Navbar from './components/Navbar';
import hero from "./elf-squad-hero.png"
import Hero from './components/Hero';
import Card from './components/Card';
import Elfspeech from './components/Elfspeech';
import Quote from './components/Quote';
import Footer from './components/Footer';
import axios from "axios";


function App() {
  const handleFormSubmit = async (formData) => {
    try {
      await axios.post('http://localhost:5000/send-email', formData);
      // Email sent successfully, do something (e.g., show a success message)
    } catch (error) {
      console.error('Error sending email:', error);
      // Handle error (e.g., show an error message)
    }
  };

  let imgs=[
    {src:'./portfolio-house-1.png'},
    {src:'./portfolio-house-2.png'},
    {src:'./portfolio-house-3.png'},
    {src:'./portfolio-house-4.png'},
    {src:'./portfolio-house-5.png'},
    {src:'./portfolio-house-6.png'},
    {src:'./portfolio-house-7.png'},
    {src:'./portfolio-house-8.png'},
    {src:'./portfolio-house-9.png'},
  ]
  const cardElements = imgs.map((img, index) => {
    return <Card key={index} src={img.src}/>
  })
  return (
    <div className="App">
      <header id="App-header">
        <Navbar src={logo} />
        <Hero imgSrc={hero} />
      </header>
      <section id='portfolio'>
        <Elfspeech speech="Heres some of the elves' hard work!"/>
        <div className='cardCarousel'>
          {cardElements}
          
        </div>
      </section>
      <section id='quote'>
        <Quote onSubmit={handleFormSubmit} />

      </section>
      <Footer/>
    </div>
  );
}

export default App;
