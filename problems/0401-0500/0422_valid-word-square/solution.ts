function validWordSquare(words: string[]): boolean {
    // A word square mirrors across its diagonal with absence counted:
    // the character at (i, j) demands a same-character mirror at
    // (j, i), so row j must exist at all and reach back to column i.
    const count = words.length;
    for (let i = 0; i < count; ++i) {
        const row = words[i];
        for (let j = 0; j < row.length; ++j) {
            if (j >= count || i >= words[j].length || words[j][i] !== row[j]) {
                return false;
            }
        }
    }
    return true;
}
