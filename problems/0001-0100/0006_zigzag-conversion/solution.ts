function convert(s: string, numRows: number): string {
    // One row never turns (the direction flag below could never flip), and
    // a grid taller than the text is a single pass down: either way the
    // zigzag is the string itself.
    if (numRows === 1 || numRows >= s.length) {
        return s;
    }
    const rows: string[][] = Array.from({ length: numRows }, () => []);
    // Walk the string once, tracking the current row and direction; reverse
    // exactly at the top and bottom rows, where the zigzag turns.
    let index = 0,
        step = -1;
    for (const ch of s) {
        rows[index].push(ch);
        if (index === 0) {
            step = 1;
        } else if (index === numRows - 1) {
            step = -1;
        }
        index += step;
    }
    // Reading the rows top to bottom is the conversion.
    return rows.map((row) => row.join("")).join("");
}
