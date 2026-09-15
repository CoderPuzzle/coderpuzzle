// Problem-provided oracle (ArrayReader), JavaScript side. Evaluated
// with every submission by the judge; never editable in the editor.
// Constructed from the case state: the hidden array (generic array of
// values) and the query budget. Integers may arrive as BigInt for
// exactness.
class ArrayReader {
    constructor(construction, budget) {
        this.values = construction[0].map((entry) => Number(entry));
        this.budget = Number(budget);
    }

    compareSub(l, r, x, y) {
        if (this.budget <= 0) {
            throw new Error("ArrayReader query budget exhausted");
        }
        this.budget -= 1;
        let left = 0;
        for (let i = l; i <= r; i++) {
            left += this.values[i];
        }
        let right = 0;
        for (let i = x; i <= y; i++) {
            right += this.values[i];
        }
        if (left > right) {
            return 1;
        }
        if (left < right) {
            return -1;
        }
        return 0;
    }

    length() {
        return this.values.length;
    }
}
