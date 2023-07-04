import React, { useEffect,useState }  from 'react';
import axios from 'axios';
import Elfspeech from './Elfspeech';

export default function Quote({onSubmit}) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    description: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      onSubmit(formData);
      // Email sent successfully, do something (e.g., show a success message)
      console.log('Email sent successfully');
      setSubmitted(true);
    } catch (error) {
      console.error('Error sending email:', error);
      // Handle error (e.g., show an error message)
    }
    // Reset the form after submission
    setFormData({
      name: '',
      address: '',
      phone: '',
      email: '',
      description: ''
    });
  };

  useEffect(() => {
    const quoteSection = document.querySelector('.quote--row');

    if (!quoteSection) {
      console.error("Element with class 'quote--row' not found.");
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

        } else {
          entry.target.classList.remove('visible');

        }
      });
    });

    observer.observe(quoteSection);

    return () => {
      observer.unobserve(quoteSection);
    };
  }, []);

  if (submitted) {
    return (
      <div className='quote--container'>
      <h2>Get a quote</h2>
      <div className='quote--row visible'>
        <Elfspeech elf={false} speech="Thank you, we will get back to you shortly"/>
        <div className='quote--contact-container'>
          <img
            className='quote--elf-contact-img'
            src='elf-contact.png'
            alt='elf on the phone'
          />
          <p>
            Alternatively, you can give us a call at{' '}
            <span className='elf-phone'>(647) 784-6580</span> to speak to an elf directly.
          </p>
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className='quote--container'>
      <h2>Get a quote</h2>
      <p>We can promptly quote your home using google maps!</p>
      <div className='quote--row'>
        <div className='quote--content-container'>
          <form className='quote--form-container' onSubmit={handleSubmit}>
            <label>Enter your details:</label>
            <input
              name='name'
              type='text'
              placeholder='Enter your name'
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              name='address'
              type='text'
              placeholder='Enter your address'
              value={formData.address}
              onChange={handleInputChange}
            />
            <input
              name='phone'
              type='text'
              placeholder='Enter your phone number'
              value={formData.phone}
              onChange={handleInputChange}
            />
            <input
              name='email'
              type='text'
              placeholder='Enter your email'
              value={formData.email}
              onChange={handleInputChange}
            />
            <textarea
              className='description'
              name='description'
              cols='50'
              rows='5'
              placeholder="Write a brief description of what you'd like done"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
            <button className='primary-btn' type='submit'>
              Submit
            </button>
          </form>
          <img
            className='quote--form-img'
            src='./portfolio-house-7.png'
            alt='christmas lights on house'
          />
        </div>
        <div className='quote--contact-container'>
          <img
            className='quote--elf-contact-img'
            src='elf-contact.png'
            alt='elf on the phone'
          />
          <p>
            Alternatively, you can give us a call at{' '}
            <span className='elf-phone'>(647) 784-6580</span> to speak to an elf directly.
          </p>
        </div>
      </div>
    </div>
  );
}
