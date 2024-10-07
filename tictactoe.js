const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X'; // Track the current player with a simple variable
const player1Image = "xhere.png"; // Image for Player 1
const player2Image = "ohere.png"; // Image for Player 2

const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
let gameActive = true;
let countFilled = 0;

let p1Point = 0;
let p2Point = 0;
let tiePoint = 0;

// Set the active player class initially
player1.classList.add('active');

// Add event listeners to each cell
cells.forEach(cell => {
    cell.addEventListener('click', () => makeMove(cell));
});

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],  // Row 1
        [3, 4, 5],  // Row 2
        [6, 7, 8],  // Row 3
        [0, 3, 6],  // Column 1
        [1, 4, 7],  // Column 2
        [2, 5, 8],  // Column 3
        [0, 4, 8],  // Diagonal 1
        [2, 4, 6]   // Diagonal 2
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => {
            const cellImage = cells[index].querySelector('img');
            return cellImage && cellImage.src.includes(currentPlayer === 'X' ? player1Image : player2Image); // Check if the cell contains the current player's image
        });
    });
}

function resetGame() {
    cells.forEach(cell => {
        cell.innerHTML = '';
    });

    currentPlayer = 'X';
    gameActive = true;
    countFilled = 0;

    player1.classList.add('active');
    player2.classList.remove('active');
}

function makeMove(cell) {
    // Ensure the cell is empty and the game is active
    if (cell.children.length === 0 && gameActive) {
        const newPlayerImage = document.createElement("img"); // Create a new image for the move
        newPlayerImage.src = currentPlayer === 'X' ? player1Image : player2Image; // Set image source based on current player
        newPlayerImage.width = 100; // Set the image width
        newPlayerImage.height = 100; // Set the image height
        cell.appendChild(newPlayerImage); // Add the image to the cell
        countFilled++;

    }
    // Check for a winner
    if (checkWinner()) {
        gameActive = false;
        const winner = currentPlayer === 'X' ? 'Player 1' : 'Player 2';

        if (currentPlayer == 'X') {
            p1Point++;
            document.getElementById('p1Point').innerHTML = p1Point;

        } else {
            p2Point++;
            document.getElementById('p2Point').innerHTML = p2Point;

        }

        setTimeout(() => {
            alert(`${winner} wins!`);
            resetGame();

        }, 150);
        return;
    }

    // Check for a tie
    if (countFilled >= 9) {
        gameActive = false;

        tiePoint++;
        document.getElementById('tiePoint').innerHTML = tiePoint;
        setTimeout(() => {
            alert(`It's a tie!`);
            resetGame();
        }, 150);
        return;
    }

    // Switch the current player
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'; // Switch between X and O
    highlightPlayer(); // Update the active player highlight

}

function highlightPlayer() {
    if (currentPlayer === 'X') {
        player1.classList.add('active');
        player2.classList.remove('active');
    } else {
        player2.classList.add('active');
        player1.classList.remove('active');
    }
}
