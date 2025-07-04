
   let score = JSON.parse(localStorage.getItem('score')) || {
      wins: 0,
      losses: 0,
      ties: 0
    };
    updateScoreElement();
    let isAutoPlaying = false;
    let intervalId;

    function autoPlay(){
      if(!isAutoPlaying){
         intervalId =  setInterval( ()=> {
        const playerMove = pickComputerMove();
      playGame(playerMove);
      },1000)
      isAutoPlaying = true
      }else{
        clearInterval(intervalId);
        isAutoPlaying = false;
      }
     
    }

    document.querySelector('.js-rock-button').addEventListener('click', ()=>{
      playGame('rock');
    });

     document.querySelector('.js-paper-button').addEventListener('click', ()=>{
      playGame('paper');
    });

    document.querySelector('.js-scissors-button').addEventListener('click', ()=>{
      playGame('scissors');
    });

    document.querySelector('.js-reset-button').addEventListener('click', ()=>{
      score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    });

    document.querySelector('.js-auto-button').addEventListener('click', ()=>{
        autoPlay();
});

document.body.addEventListener('keydown', (event) => {
   if(event.key === 'r'){
    playGame('rock')
   }else if(event.key === 'p'){
    playGame('paper')
   }
   else if(event.key === 's'){
    playGame('scissors')
   }
   else if(event.key === '0'){
      score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
   }
   
})


    function playGame(playerMove) {
      const computerMove = pickComputerMove();
      let result = '';

      if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
          result = 'You lose.';
        } else if (computerMove === 'paper') {
          result = 'You win.';
        } else {
          result = 'Tie.';
        }
      } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
          result = 'You win.';
        } else if (computerMove === 'paper') {
          result = 'Tie.';
        } else {
          result = 'You lose.';
        }
      } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
          result = 'Tie.';
        } else if (computerMove === 'paper') {
          result = 'You lose.';
        } else {
          result = 'You win.';
        }
      }

      if (result === 'You win.') {
        score.wins += 1;
      } else if (result === 'You lose.') {
        score.losses += 1;
      } else if (result === 'Tie.') {
        score.ties += 1;
      }

      localStorage.setItem('score', JSON.stringify(score));

      updateScoreElement();

      document.querySelector('.js-result').innerHTML = result;

      document.querySelector('.js-moves').innerHTML = `<img src="images/user-svgrepo-com.svg" class="move-logo" >
    <img src="images/${playerMove}-emoji.svg" class="move-icon">
    <img src="images/${computerMove}-emoji.svg" class="move-icon">
    <img src="images/robot-svgrepo-com.svg" class="move-logo"> `;

          }

    function updateScoreElement(){
        document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Draws: ${score.ties}`;
    }

    function pickComputerMove() {
      const randomNumber = Math.random();
      if (randomNumber < 1 / 3) {
        return 'rock';
      } else if (randomNumber < 2 / 3) {
        return 'paper';
      } else {
        return 'scissors';
      }
    }
 