// One counter per line: rows/cols carry each player's mark count on every
// line, plus one counter per diagonal — a counter reaching n means the
// player owns the whole line, so no board is stored.
class TicTacToe {
    private n: number;
    private rows: number[][];
    private cols: number[][];
    private diagonal: number[];
    private antiDiagonal: number[];

    constructor(n: number) {
        // Index 0 stays unused so the player ids 1 and 2 address their
        // own counter rows directly.
        this.n = n;
        this.rows = [];
        this.cols = [];
        for (let player = 0; player < 3; player++) {
            this.rows.push(new Array<number>(n).fill(0));
            this.cols.push(new Array<number>(n).fill(0));
        }
        this.diagonal = [0, 0, 0];
        this.antiDiagonal = [0, 0, 0];
    }

    move(row: number, col: number, player: number): number {
        // Only the lines through the played square can complete on this
        // move, so the counters just bumped decide the winner.
        this.rows[player][row] += 1;
        this.cols[player][col] += 1;
        if (row === col) {
            this.diagonal[player] += 1;
        }
        if (row + col === this.n - 1) {
            this.antiDiagonal[player] += 1;
        }
        if (
            this.rows[player][row] === this.n ||
            this.cols[player][col] === this.n ||
            this.diagonal[player] === this.n ||
            this.antiDiagonal[player] === this.n
        ) {
            return player;
        }
        return 0;
    }
}
