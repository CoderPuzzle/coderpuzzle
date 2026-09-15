function totalDistance(s: string): number {
    // The keyboard is three ragged rows — qwertyuiop, asdfghjkl,
    // zxcvbnm — so recording each letter's (row, col) cell once turns
    // the answer into a running Manhattan sum: the finger starts on
    // 'a', and each typed letter adds |r1 - r2| + |c1 - c2| for the
    // move from the previous key.
    const row = new Array<number>(26).fill(0);
    const col = new Array<number>(26).fill(0);
    ["qwertyuiop", "asdfghjkl", "zxcvbnm"].forEach((keys, r) => {
        for (let c = 0; c < keys.length; ++c) {
            row[keys.charCodeAt(c) - 97] = r;
            col[keys.charCodeAt(c) - 97] = c;
        }
    });
    let total = 0;
    let pr = row[0];
    let pc = col[0];
    for (const ch of s) {
        const i = ch.charCodeAt(0) - 97;
        total += Math.abs(pr - row[i]) + Math.abs(pc - col[i]);
        pr = row[i];
        pc = col[i];
    }
    return total;
}
