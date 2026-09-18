// Problem-provided oracle (InfiniteStream), JavaScript side. Evaluated with
// every submission by the judge; never editable in the editor.
// Constructed from the case state: the recorded bit prefix (generic
// array) and the query budget. Integers may arrive as BigInt for
// exactness.
class InfiniteStream {
    constructor(construction, budget) {
        this.bits = construction[0].map((item) => Number(item));
        this.budget = Number(budget);
        this.position = 0;
    }

    next() {
        if (this.budget <= 0) {
            throw new Error("InfiniteStream query budget exhausted");
        }
        this.budget -= 1;
        const value = this.bits[this.position];
        this.position += 1;
        return value;
    }
}
