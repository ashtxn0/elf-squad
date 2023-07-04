import React, { useEffect } from 'react';

export default function Elfspeech(props) {
  useEffect(() => {
    const speechBubble = document.querySelector('.speech-bubble');

    if (!speechBubble) {
      console.error("Element with class 'speech-bubble' not found.");
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('entry-animation');
          const paragraph = entry.target.querySelector('p');
          if(paragraph){
            paragraph.classList.add("typing-animation")
          }
        } else {
          entry.target.classList.remove('entry-animation');
          const paragraph = entry.target.querySelector('p');
          if(paragraph){
            paragraph.classList.remove("typing-animation")
          }
        }
      });
    });

    observer.observe(speechBubble);

    return () => {
      observer.unobserve(speechBubble);
    };
  }, []);
  if (props.elf===false){
    return (
      <div className="elf-row">
        <div className="speech-bubble">
          <p className='elfspeech-text'>{props.speech}</p>
        </div>
      </div>
    );
  } else{
    return (
      <div className="elf-row">
        <img alt="Elf icon" height="150px" src="./elf-2.svg" />
        <div className="speech-bubble">
          <p className='elfspeech-text'>{props.speech}</p>
        </div>
      </div>
    );
  }

}