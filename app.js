const gameMessageElement = document.querySelector('.message');
const player1Element = document.querySelector('.player-1');
const player2Element = document.querySelector('.player-2');
const player1healthElement = document.querySelector('.player-1-health-bar');
const player2healthElement = document.querySelector('.player-2-health-bar');
const playBtn = document.querySelectorAll('.play-btn');
const resetBtn = document.querySelectorAll('.reset-btn');
let player1health;
let player2health;
let player2Option;
let isGameOver;
const updateData = (element, message) => {
    element.textContent = message;
};

const init = () => {
    player1health = 100;
    player2health = 100;
    isGameOver = false;
    player1healthElement.style.width = '100%';
    player2healthElement.style.width = '100%';
    updateData(gameMessageElement, 'fight');
    updateData(player1Element, '🤜');
    updateData(player2Element, '🤛');
};
init();
const player2Time = () => {
    const player2Options = Math.trunc(Math.random() * 3) + 1;
    switch (player2Options) {
        case 1:
            player2Option = {
                name: 'Rock', emoji: '✊'
            };
            break;
        case 2:
            player2Option = {
                name: 'Paper', emoji: '✋'
            };
            break;
        case 3:
            player2Option = {
                name: 'Scissors', emoji: '✌️'
            };
            break;
    };
};

const determineWinner = () => {
    if (player1health <= 0 || player2health <= 0) {
        if (player1health > player2health) {
            updateData(gameMessageElement, 'You win!');
        } else {
            updateData(gameMessageElement, 'You lose!')
        }
        isGameOver = true;
    }
};

playBtn.forEach((e) => {
    e.addEventListener('click', () => {
        const player1Option = e.getAttribute('data-option');
        player2Time();
        if (!isGameOver) {
            if (player1Option === player2Option.name) {
                updateData(player1Element, player2Option.emoji);
                updateData(player2Element, player2Option.emoji);
                updateData(gameMessageElement, 'it`s a draw. No damage.');
            } else if (player1Option === 'Rock') {
                updateData(player1Element, '✊');
                updateData(player2Element, player2Option.emoji);

                if (player2Option.name === 'Paper') {
                    updateData(gameMessageElement, 'Player 2 hit (+1)');
                    player1health -= 20;
                    player1healthElement.style.width = `${player1health}%`;
                } else {
                    updateData(gameMessageElement, 'Player 1 hit (+1)');
                    player2health -= 20;
                    player2healthElement.style.width = `${player2health}%`;
                }
            } else if (player1Option === 'Paper') {
                updateData(player1Element, '✋');
                updateData(player2Element, player2Option.emoji);

                if (player2Option.name === 'Scissors') {
                    updateData(gameMessageElement, 'Player 2 hit (+1)');
                    player1health -= 20;
                    player1healthElement.style.width = `${player1health}%`;
                } else {
                    updateData(gameMessageElement, 'Player 1 hit (+1)');
                    player2health -= 20;
                    player2healthElement.style.width = `${player2health}%`;
                }
            } else {
                updateData(player1Element, '✌️');
                updateData(player2Element, player2Option.emoji);

                if (player2Option.name === 'Rock') {
                    updateData(gameMessageElement, 'Player 2 hit (+1)');
                    player1health -= 20;
                    player1healthElement.style.width = `${player1health}%`;
                } else {
                    updateData(gameMessageElement, 'Player 1 hit (+1)');
                    player2health -= 20;
                    player2healthElement.style.width = `${player2health}%`;
                }
            }
            determineWinner();
        } else {
            updateData(gameMessageElement, 'the game is over. please reset!');
        }
    });
});
resetBtn.addEventListener('click', init);

