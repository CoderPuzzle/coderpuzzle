function printVertically(s: string): string[] {
    // Row k takes character k of every word in order; short words pad with a
    // space, and trailing spaces are trimmed off each row.
    const words = s.split(" ");
    const height = Math.max(...words.map((w) => w.length));
    const rows: string[] = [];
    for (let k = 0; k < height; ++k) {
        let row = "";
        for (const word of words) {
            row += k < word.length ? word[k] : " ";
        }
        rows.push(row.replace(/\s+$/, ""));
    }
    return rows;
}
