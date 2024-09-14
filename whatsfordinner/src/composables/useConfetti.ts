// Funktion til at generere konfetti ved opskriftvalg.

export function useConfetti() {
    const createConfetti = () => {
      const confettiCount = 50;
      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
  
        confetti.style.setProperty('--color', getRandomColor());
        confetti.style.setProperty('--size', `${Math.random() * 10 + 5}px`);
        confetti.style.setProperty('--angle', `${Math.random() * 360}deg`);
  
        document.body.appendChild(confetti);
  
        setTimeout(() => {
          confetti.remove();
        }, 2000); // Remove confetti after 2 seconds
      }
    };
  
    const getRandomColor = () => {
      const colors = ['#ff0', '#f0f', '#0ff', '#f00', '#0f0', '#00f'];
      return colors[Math.floor(Math.random() * colors.length)];
    };
  
    return { createConfetti };
  }
  