// Problem-provided oracle (Robot), JavaScript side. Evaluated with
// every submission by the judge; never editable in the editor.
// Constructed from the case state: the room grid and the start cell
// (generic arrays) and the operation budget. Integers may arrive as
// BigInt for exactness.
class Robot {
    constructor(construction, budget) {
        this.room = construction[0].map((row) => row.map((item) => Number(item)));
        this.row = Number(construction[1][0]);
        this.col = Number(construction[1][1]);
        this.face = 0; // starts facing up
        this.cleaned = new Set();
        this.budget = Number(budget);
        this.clean();
    }

    move() {
        this.spend();
        const directions = [
            [-1, 0],
            [0, 1],
            [1, 0],
            [0, -1],
        ]; // up, right, down, left
        const nr = this.row + directions[this.face][0];
        const nc = this.col + directions[this.face][1];
        if (nr < 0 || nr >= this.room.length || nc < 0 || nc >= this.room[nr].length || this.room[nr][nc] === 0) {
            return false; // wall or blocked cell: stays in place
        }
        this.row = nr;
        this.col = nc;
        return true;
    }

    turnLeft() {
        this.spend();
        this.face = (this.face + 3) % 4;
    }

    turnRight() {
        this.spend();
        this.face = (this.face + 1) % 4;
    }

    clean() {
        this.spend();
        this.cleaned.add(`${this.row},${this.col}`);
    }

    verdict() {
        const cells = [...this.cleaned].map((key) => key.split(",").map(Number));
        cells.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
        return cells;
    }

    spend() {
        if (this.budget <= 0) {
            throw new Error("Robot operation budget exhausted");
        }
        this.budget -= 1;
    }
}
