// The body as an array (tail at index 0, head at the end) plus a Set of
// the covered cells, each encoded as row * width + col: move pushes the
// new head on and — unless food is eaten — drops the tail in the same
// step, so the snake slides forward exactly one cell and the Set answers
// the body-collision question in O(1).
class SnakeGame {
    private width: number;
    private height: number;
    private food: number[][];
    private nextFood = 0;
    private score = 0;
    private body: number[]; // index 0 is the tail's key; the last is the head's
    private occupied: Set<number>;

    constructor(width: number, height: number, food: number[][]) {
        this.width = width;
        this.height = height;
        this.food = food;
        this.body = [0];
        this.occupied = new Set([0]);
    }

    move(direction: string): number {
        const head = this.body[this.body.length - 1];
        let row = Math.floor(head / this.width);
        let col = head % this.width;
        if (direction === "U") {
            row -= 1;
        } else if (direction === "D") {
            row += 1;
        } else if (direction === "L") {
            col -= 1;
        } else {
            col += 1;
        }
        if (row < 0 || row >= this.height || col < 0 || col >= this.width) {
            return -1;
        }
        const cell = row * this.width + col;
        const piece = this.food[this.nextFood];
        const eating = piece !== undefined && piece[0] === row && piece[1] === col;
        if (!eating) {
            // The tail vacates its cell in this very step, so a head
            // landing on the CURRENT tail position is legal.
            this.occupied.delete(this.body.shift());
        }
        if (this.occupied.has(cell)) {
            return -1;
        }
        this.body.push(cell);
        this.occupied.add(cell);
        if (eating) {
            this.nextFood += 1;
            this.score += 1;
        }
        return this.score;
    }
}
