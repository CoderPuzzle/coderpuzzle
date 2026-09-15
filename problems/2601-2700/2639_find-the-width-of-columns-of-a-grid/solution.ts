function findColumnWidth(grid: number[][]): number[] {
    // Width of a value = digits of its magnitude plus one sign character
    // when negative. Repeated division by 10 counts the digits without
    // materializing strings, and every column keeps a running maximum.
    const lengths = function (value: number): number {
        let width = value < 0 ? 1 : 0;
        let rest = Math.abs(value);
        do {
            width++;
            rest = Math.floor(rest / 10);
        } while (rest > 0);
        return width;
    };
    const widths: number[] = new Array(grid[0].length).fill(0);
    for (const row of grid) {
        for (let column = 0; column < row.length; ++column) {
            widths[column] = Math.max(widths[column], lengths(row[column]));
        }
    }
    return widths;
}
