class SubrectangleQueries {
    constructor(rectangle) {
        this.rect = rectangle.map((row) => [...row]);
    }

    updateSubrectangle(row1, col1, row2, col2, newValue) {
        for (let r = row1; r <= row2; r++) {
            for (let c = col1; c <= col2; c++) {
                this.rect[r][c] = newValue;
            }
        }
    }

    getValue(row, col) {
        return this.rect[row][col];
    }
}
