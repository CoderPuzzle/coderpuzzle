function checkXMatrix(grid: number[][]): boolean {
    const size = grid.length;
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (row === col || row + col === size - 1) {
                if (grid[row][col] === 0) return false;
            } else if (grid[row][col] !== 0) {
                return false;
            }
        }
    }
    return true;
}
