// A hash map from cell reference to its current value. Unset cells simply
// read as 0 through a defaulting lookup, and resetCell writes 0 rather
// than deleting, so every cell state lives in one place. getValue drops
// the leading '=', splits on '+', and classifies each operand by its
// first character: a capital letter means a cell reference, anything else
// is a non-negative integer literal.
class Spreadsheet {
    private values: Map<string, number>;

    constructor(rows: number) {
        this.values = new Map();
    }

    setCell(cell: string, value: number): void {
        this.values.set(cell, value);
    }

    resetCell(cell: string): void {
        this.values.set(cell, 0);
    }

    getValue(formula: string): number {
        let total = 0;
        for (const operand of formula.slice(1).split("+")) {
            const head = operand[0];
            if (head >= "A" && head <= "Z") {
                const stored = this.values.get(operand);
                total += stored === undefined ? 0 : stored;
            } else {
                total += Number(operand);
            }
        }
        return total;
    }
}
