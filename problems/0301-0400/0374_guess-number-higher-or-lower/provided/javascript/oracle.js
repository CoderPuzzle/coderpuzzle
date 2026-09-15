// Problem-provided oracle (Guess), JavaScript side. Evaluated with
// every submission by the judge; never editable in the editor.
// Constructed from the case state: the hidden picked number (generic
// value) and the query budget. Integers may arrive as BigInt for
// exactness.
class Guess {
    constructor(construction, budget) {
        this.pick = Number(construction[0]);
        this.budget = Number(budget);
    }

    guess(num) {
        if (this.budget <= 0) {
            throw new Error("Guess query budget exhausted");
        }
        this.budget -= 1;
        if (num > this.pick) {
            return -1;
        }
        if (num < this.pick) {
            return 1;
        }
        return 0;
    }
}
