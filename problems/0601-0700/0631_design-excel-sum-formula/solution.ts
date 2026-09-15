// Cell values beside per-cell formula lists, both plain grids: set()
// writes the literal and empties the cell's formula list; sum() installs
// the flattened reference list parsed from numbers; get() resolves on
// demand, recursing through formula cells so a later set() on a source
// cell is picked up by the next get() of anything downstream.
class Excel {
    private values: number[][];
    private formulas: ([number, number][] | null)[][];

    constructor(height: number, width: string) {
        const columns = width.charCodeAt(0) - 65 + 1;
        this.values = [];
        this.formulas = [];
        for (let row = 0; row <= height; row++) {
            this.values.push(new Array<number>(columns).fill(0));
            this.formulas.push(new Array<[number, number][] | null>(columns).fill(null));
        }
    }

    set(row: number, column: string, val: number): void {
        const col = column.charCodeAt(0) - 65;
        this.values[row][col] = val;
        this.formulas[row][col] = null;
    }

    get(row: number, column: string): number {
        return this.value(row, column.charCodeAt(0) - 65);
    }

    sum(row: number, column: string, numbers: string[]): number {
        const col = column.charCodeAt(0) - 65;
        const references: [number, number][] = [];
        for (const number of numbers) {
            const ends = number.split(":");
            const first = this.cell(ends[0]);
            if (ends.length === 1) {
                references.push(first);
                continue;
            }
            const last = this.cell(ends[1]);
            for (let r = first[0]; r <= last[0]; r++) {
                for (let c = first[1]; c <= last[1]; c++) {
                    references.push([r, c]);
                }
            }
        }
        this.formulas[row][col] = references;
        return this.value(row, col);
    }

    // A cell token is one column letter followed by the row number.
    private cell(token: string): [number, number] {
        return [Number(token.slice(1)), token.charCodeAt(0) - 65];
    }

    private value(row: number, col: number): number {
        const references = this.formulas[row][col];
        if (references === null) {
            return this.values[row][col];
        }
        let total = 0;
        // Recursing into each reference is the whole update story: no
        // propagation, no cache, the chain recomputed on every get.
        for (const [r, c] of references) {
            total += this.value(r, c);
        }
        return total;
    }
}
