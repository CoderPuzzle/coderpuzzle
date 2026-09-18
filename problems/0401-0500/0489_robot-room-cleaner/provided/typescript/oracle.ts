// Problem-provided oracle (Robot), TypeScript side. Compiled with
// every submission by the judge; never editable in the editor.
// Constructed from the case state: the room grid and the start cell
// (generic arrays) and the operation budget. Integers may arrive as
// BigInt for exactness.
class Robot {
    private room: number[][];
    private row: number;
    private col: number;
    private face: number; // 0 = up
    private cleaned: Set<string>;
    private budget: number;

    constructor(construction: any[], budget: any) {
        this.room = construction[0].map((row: any) => row.map((item: any) => Number(item)));
        this.row = Number(construction[1][0]);
        this.col = Number(construction[1][1]);
        this.face = 0; // starts facing up
        this.cleaned = new Set<string>();
        this.budget = Number(budget);
        this.clean();
    }

    move(): boolean {
        this.spend();
        const directions: number[][] = [
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

    turnLeft(): void {
        this.spend();
        this.face = (this.face + 3) % 4;
    }

    turnRight(): void {
        this.spend();
        this.face = (this.face + 1) % 4;
    }

    clean(): void {
        this.spend();
        this.cleaned.add(`${this.row},${this.col}`);
    }

    verdict(): number[][] {
        const cells = [...this.cleaned].map((key) => key.split(",").map(Number));
        cells.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
        return cells;
    }

    private spend(): void {
        if (this.budget <= 0) {
            throw new Error("Robot operation budget exhausted");
        }
        this.budget -= 1;
    }
}
