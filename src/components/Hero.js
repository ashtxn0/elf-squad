import React, { useEffect, useRef } from 'react';

export default function Hero(props) {
  const handleButtonClick = () => {
    document.getElementById('quote').scrollIntoView();
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = {};
    let particleIndex = 0;
    const particleNum = 1;
    const vy = 2.5;
    const vx = Math.random();
    const mlife = 350;

    function Particle() {
      this.x = Math.floor(Math.random() * canvas.width - 100);
      this.y = -20;
      this.vx = vx;
      this.vy = vy;
      this.size = Math.floor(Math.random() * 3) + 1;
      this.gravity = 0.02;
      if (this.size > 2) {
        this.vy += 0.2;
      } else if (this.size < 2) {
        this.vy -= 0.2;
      }
      particleIndex++;
      particles[particleIndex] = this;
      this.id = particleIndex;
      this.life = 0;
      this.maxLife = mlife;
    }

    Particle.prototype.draw = function () {
      const r = Math.floor(Math.random() * 100);
      const v = 10;
      this.x += this.vx;
      this.y += this.vy;
      if (r < v) {
        this.vx -= Math.random() * 1 - 0.5;
        this.vy += this.vy / 1000;
      }
      if (this.y >= 650) {
        this.vy = 0;
        this.vx = 0;
        this.size += 1 / 10;
      }
      this.vy += this.gravity;
      this.life++;
      if (this.life >= this.maxLife) {
        delete particles[this.id];
      }

      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fill();
    };

    function drawBackground() {
      const img = new Image();
      img.src = './elf-squad-hero.png';
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground();

      for (let i = 0; i < particleNum; i++) {
        new Particle();
      }

      for (let i in particles) {
        particles[i].draw();
      }

      requestAnimationFrame(animateParticles);
    }

    drawBackground();
    animateParticles();
  }, []);

  return (
    <div className='hero-container'>
      <h1>Holiday Lights</h1>
      <h2>Hi, we're Elves! We work for Santa! We Supply, Install and Takedown Christmas lights!</h2>
      <div className='hero--btn-container'>
        <button onClick={handleButtonClick} className="primary-btn">Get a Quote</button>
        <button onClick={handleButtonClick} className="secondary-btn">Contact us</button>
      </div>

      <canvas width="1400" height="660" id="snow-canvas" ref={canvasRef}></canvas>
    </div>
  );
}