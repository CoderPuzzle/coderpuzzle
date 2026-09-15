// Problem-provided oracle (CategoryHandler), JavaScript side. Evaluated
// with every submission by the judge; never editable in the editor.
// Constructed from the case state: the category assignment (generic
// array, integers may arrive as BigInt for exactness) plus the query
// budget; only haveSameCategory reveals it.
class CategoryHandler {
    constructor(construction, budget) {
        this.category = construction[0].map((item) => Number(item));
        this.budget = budget;
    }

    haveSameCategory(a, b) {
        if (this.budget <= 0) {
            throw new Error("CategoryHandler query budget exhausted");
        }
        this.budget -= 1;
        if (a < 0 || a >= this.category.length || b < 0 || b >= this.category.length) {
            return false;
        }
        return this.category[a] === this.category[b];
    }
}
