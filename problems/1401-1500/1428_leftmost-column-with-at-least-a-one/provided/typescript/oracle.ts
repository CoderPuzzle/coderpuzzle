// Problem-provided oracle (BinaryMatrix), TypeScript side. Compiled with
// every submission by the judge; never editable in the editor.
// Constructed from the case state: the hidden grid rows (generic array
// of row arrays) and the query budget. Integers may arrive as BigInt for
// exactness.
class BinaryMatrix {
    private rows: number[][];
    private budget: number;

    constructor(construction: any[], budget: any) {
        this.rows = construction[0].map((row: any[]) => row.map((entry: any) => Number(entry)));
        this.budget = Number(budget);
    }

    get(row: number, col: number): number {
        if (this.budget <= 0) {
            throw new Error("BinaryMatrix query budget exhausted");
        }
        this.budget -= 1;
        return this.rows[row][col];
    }

    dimensions(): number[] {
        return [this.rows.length, this.rows.length === 0 ? 0 : this.rows[0].length];
    }
}
