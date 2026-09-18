// Problem-provided oracle (Sea), TypeScript side. Compiled with every
// submission by the judge; never editable in the editor. Constructed from
// the case state: the hidden ship points (generic array of pairs) and the
// query budget. Integers may arrive as BigInt for exactness.
class Sea {
    private ships: number[][];
    private budget: number;

    constructor(construction: any[], budget: any) {
        this.ships = construction[0].map((point: any[]) => [Number(point[0]), Number(point[1])]);
        this.budget = Number(budget);
    }

    hasShips(topRight: number[], bottomLeft: number[]): boolean {
        if (this.budget <= 0) {
            throw new Error("Sea query budget exhausted");
        }
        this.budget -= 1;
        return this.ships.some(
            ([x, y]: number[]) => x >= bottomLeft[0] && x <= topRight[0] && y >= bottomLeft[1] && y <= topRight[1],
        );
    }
}
