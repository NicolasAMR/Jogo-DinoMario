function saveHighScore() {
    const highScore = localStorage.getItem('highScore') || 0;
    if (score > highScore) {
      localStorage.setItem('highScore', score);
    }
  }
  
  function displayHighScore() {
    const highScore = localStorage.getItem('highScore') || 0;
    alert(`Recorde atual: ${highScore}`);
  }
  