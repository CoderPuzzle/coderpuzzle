function cellsInRange(s: string): string[] {
    // Columns outer, rows inner produces exactly the required order.
    const out: string[] = [];
    for (let col = s.charCodeAt(0); col <= s.charCodeAt(3); ++col) {
        for (let row = s.charCodeAt(1); row <= s.charCodeAt(4); ++row) {
            out.push(String.fromCharCode(col, row));
        }
    }
    return out;
}
