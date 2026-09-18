// Problem-provided oracle (Sea), JavaScript side. Evaluated with every
// submission by the judge; never editable in the editor. Constructed from
// the case state: the hidden ship points (generic array of pairs) and the
// query budget. Integers may arrive as BigInt for exactness.
class Sea {
    constructor(construction, budget) {
        this.ships = construction[0].map((point) => [Number(point[0]), Number(point[1])]);
        this.budget = Number(budget);
    }

    hasShips(topRight, bottomLeft) {
        if (this.budget <= 0) {
            throw new Error("Sea query budget exhausted");
        }
        this.budget -= 1;
        return this.ships.some(
            ([x, y]) => x >= bottomLeft[0] && x <= topRight[0] && y >= bottomLeft[1] && y <= topRight[1],
        );
    }
}
