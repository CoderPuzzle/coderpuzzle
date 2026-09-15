class SubrectangleQueries {
    private rect: number[][];

    constructor(rectangle: number[][]) {
        this.rect = rectangle.map((row) => [...row]);
    }

    updateSubrectangle(row1: number, col1: number, row2: number, col2: number, newValue: number) {
        for (let r = row1; r <= row2; r++) {
            for (let c = col1; c <= col2; c++) {
                this.rect[r][c] = newValue;
            }
        }
    }

    getValue(row: number, col: number): number {
        return this.rect[row][col];
    }
}
