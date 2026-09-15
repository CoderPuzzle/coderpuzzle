/**
 * @param {string[]} words
 * @param {string} result
 * @return {boolean}
 */
var isSolvable = function (words, result) {
    // Column-wise backtracking, mirroring hand addition: dfs(pos, row) walks
    // column pos of row `row`, accumulating a carry. Once every row of the
    // column is folded in, the sum's low digit must equal the result letter's
    // digit and the rest flows on as the new carry.
    const code = (ch) => ch.charCodeAt(0) - 65;
    const seen = new Array(26).fill(false);
    const leading = new Array(26).fill(false);
    for (const word of words) {
        for (const ch of word) seen[code(ch)] = true;
        leading[code(word[0])] = true;
    }
    for (const ch of result) seen[code(ch)] = true;
    leading[code(result[0])] = true;
    if (seen.filter(Boolean).length > 10) return false;

    const rows = words.map((w) => w.split("").reverse().join(""));
    const target = result.split("").reverse().join("");
    const widest = Math.max(...rows.map((r) => r.length));
    // No leading zeros, so the sum is at least 10^(widest-1): the result
    // needs at least `widest` digits and at most widest + 1.
    if (target.length < widest || target.length > widest + 1) return false;
    const value = new Array(26).fill(-1);
    const used = new Array(10).fill(false);

    const dfs = (pos, row, carry) => {
        if (pos === target.length) return carry === 0;
        if (row === rows.length) {
            // All rows folded: bind the result letter of this column.
            const digit = carry % 10;
            const ch = code(target[pos]);
            if (value[ch] !== -1) {
                return value[ch] === digit && dfs(pos + 1, 0, Math.floor(carry / 10));
            }
            if (used[digit] || (digit === 0 && leading[ch])) return false;
            value[ch] = digit;
            used[digit] = true;
            const ok = dfs(pos + 1, 0, Math.floor(carry / 10));
            if (!ok) {
                used[digit] = false;
                value[ch] = -1;
            }
            return ok;
        }
        if (pos >= rows[row].length) return dfs(pos, row + 1, carry);
        const ch = code(rows[row][pos]);
        if (value[ch] !== -1) return dfs(pos, row + 1, carry + value[ch]);
        for (let digit = 0; digit < 10; ++digit) {
            if (used[digit] || (digit === 0 && leading[ch])) continue;
            value[ch] = digit;
            used[digit] = true;
            if (dfs(pos, row + 1, carry + digit)) return true;
            used[digit] = false;
            value[ch] = -1;
        }
        return false;
    };
    return dfs(0, 0, 0);
};
