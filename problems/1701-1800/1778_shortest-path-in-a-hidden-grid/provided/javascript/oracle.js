// Problem-provided oracle (GridMaster), JavaScript side. Evaluated
// with every submission by the judge; never editable in the editor.
// Constructed from the case state: the grid, the start cell and the
// goal cell (generic values), then the query budget. Integers may
// arrive as BigInt for exactness.
const MAZE_DELTAS = { U: [-1, 0], D: [1, 0], L: [0, -1], R: [0, 1] };

class GridMaster {
    constructor(construction, budget) {
        this.cost = construction[0].map((row) => row.map((cell) => Number(cell)));
        [this.row, this.col] = construction[1].map(Number);
        [this.goalRow, this.goalCol] = construction[2].map(Number);
        this.budget = Number(budget);
    }

    canMove(direction) {
        if (this.budget <= 0) {
            throw new Error("GridMaster query budget exhausted");
        }
        this.budget -= 1;
        const [dr, dc] = MAZE_DELTAS[direction];
        return this.enterable(this.row + dr, this.col + dc);
    }

    move(direction) {
        if (this.budget <= 0) {
            throw new Error("GridMaster query budget exhausted");
        }
        this.budget -= 1;
        const [dr, dc] = MAZE_DELTAS[direction];
        const row = this.row + dr;
        const col = this.col + dc;
        if (!this.enterable(row, col)) {
            return -1;
        }
        this.row = row;
        this.col = col;
        return this.cost[row][col];
    }

    isTarget() {
        if (this.budget <= 0) {
            throw new Error("GridMaster query budget exhausted");
        }
        this.budget -= 1;
        return this.row === this.goalRow && this.col === this.goalCol;
    }

    enterable(row, col) {
        return row >= 0 && row < this.cost.length && col >= 0 && col < this.cost[row].length && this.cost[row][col] > 0;
    }
}
