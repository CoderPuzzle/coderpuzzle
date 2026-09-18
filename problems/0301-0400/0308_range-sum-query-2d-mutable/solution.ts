class NumMatrix {
    private m: number;
    private n: number;
    private matrix: number[][];
    // 2D Fenwick tree: cell (i, j) sums the rectangle i & -i rows tall and
    // j & -j columns wide ending at (i, j). 1-based in both dims, row/column
    // 0 unused so the low-bit arithmetic is valid.
    private tree: number[][];

    constructor(matrix: number[][]) {
        this.m = matrix.length;
        this.n = matrix[0].length;
        this.matrix = matrix.map((row) => row.slice());
        this.tree = [];
        for (let i = 0; i <= this.m; i++) {
            this.tree.push(new Array<number>(this.n + 1).fill(0));
        }
        // O(m*n) build: each source row becomes a 1D Fenwick row in one
        // pass, every finished block pushed into its parent column.
        for (let i = 1; i <= this.m; i++) {
            const row = new Array<number>(this.n + 1).fill(0);
            const source = this.matrix[i - 1];
            for (let j = 1; j <= this.n; j++) {
                row[j] += source[j - 1];
                const parent = j + (j & -j);
                if (parent <= this.n) {
                    row[parent] += row[j];
                }
            }
            // The finished row is added into its own tree slot, then pushed
            // whole into the parent row's slot.
            const treeRow = this.tree[i];
            for (let j = 1; j <= this.n; j++) {
                treeRow[j] += row[j];
            }
            const parentRow = i + (i & -i);
            if (parentRow <= this.m) {
                const target = this.tree[parentRow];
                for (let j = 1; j <= this.n; j++) {
                    target[j] += treeRow[j];
                }
            }
        }
    }

    update(row: number, col: number, value: number): void {
        // Only the delta is applied; the matrix copy keeps later deltas right.
        const delta = value - this.matrix[row][col];
        this.matrix[row][col] = value;
        // Dual climb over rows and columns visits exactly the tree cells
        // whose stored rectangle contains the written cell.
        for (let i = row + 1; i <= this.m; i += i & -i) {
            const treeRow = this.tree[i];
            for (let j = col + 1; j <= this.n; j += j & -j) {
                treeRow[j] += delta;
            }
        }
    }

    sumRegion(top: number, left: number, bottom: number, right: number): number {
        // Inclusion-exclusion over four top-left-anchored prefix rectangles.
        return (
            this.prefix(bottom + 1, right + 1) -
            this.prefix(top, right + 1) -
            this.prefix(bottom + 1, left) +
            this.prefix(top, left)
        );
    }

    private prefix(rows: number, cols: number): number {
        let total = 0;
        // Strip low bits from the row index, and within each row strip from
        // the column index; the disjoint rectangles exactly tile the region.
        for (let i = rows; i > 0; i -= i & -i) {
            const treeRow = this.tree[i];
            for (let j = cols; j > 0; j -= j & -j) {
                total += treeRow[j];
            }
        }
        return total;
    }
}
