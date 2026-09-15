// Problem-provided oracle (CategoryHandler), TypeScript side. Compiled
// with every submission by the judge; never editable in the editor.
// Constructed from the case state: the category assignment (generic
// array, integers may arrive as BigInt for exactness) plus the query
// budget; only haveSameCategory reveals it.
class CategoryHandler {
    private category: number[];
    private budget: number;

    constructor(construction: any[], budget: any) {
        this.category = construction[0].map((item: any) => Number(item));
        this.budget = budget;
    }

    haveSameCategory(a: number, b: number): boolean {
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
