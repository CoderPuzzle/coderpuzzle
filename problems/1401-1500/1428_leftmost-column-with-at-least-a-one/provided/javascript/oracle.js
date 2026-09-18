// Problem-provided oracle (BinaryMatrix), JavaScript side. Evaluated with
// every submission by the judge; never editable in the editor.
// Constructed from the case state: the hidden grid rows (generic array
// of row arrays) and the query budget. Integers may arrive as BigInt for
// exactness.
class BinaryMatrix {
    constructor(construction, budget) {
        this.rows = construction[0].map((row) => row.map((entry) => Number(entry)));
        this.budget = Number(budget);
    }

    get(row, col) {
        if (this.budget <= 0) {
            throw new Error("BinaryMatrix query budget exhausted");
        }
        this.budget -= 1;
        return this.rows[row][col];
    }

    dimensions() {
        return [this.rows.length, this.rows.length === 0 ? 0 : this.rows[0].length];
    }
}
