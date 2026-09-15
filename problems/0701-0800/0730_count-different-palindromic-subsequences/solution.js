/**
 * @param {string} s
 * @return {number}
 */
var countPalindromicSubsequences = function (s) {
    // dp[x][i][j] counts the distinct palindromic subsequences of
    // s[i..j] that begin and end with chr(97 + x). An end that does
    // not match x shrinks off: dp[x][i+1][j] when s[i] != x, else
    // dp[x][i][j-1]. When both ends are x, gluing x onto both sides
    // of every palindromic interior gives 2 + sum_y dp[y][i+1][j-1]
    // — the +2 is "x" and "xx" — while adjacent ends carry only
    // those two. Every read stays in rows i and i+1, so two rolling
    // rows carry the table; the answer is sum_x dp[x][0][n-1].
    const MOD = 1_000_000_007;
    const n = s.length;
    const code = [];
    for (let i = 0; i < n; ++i) code.push(s.charCodeAt(i) - 97);
    let prev = Array.from({ length: n }, () => [0, 0, 0, 0]);
    let cur = Array.from({ length: n }, () => [0, 0, 0, 0]);
    for (let i = n - 1; i >= 0; --i) {
        const c = code[i];
        cur[i] = [0, 0, 0, 0];
        cur[i][c] = 1;
        for (let j = i + 1; j < n; ++j) {
            const row = prev[j].slice();
            if (code[j] === c) {
                if (j === i + 1) {
                    row[c] = 2;
                } else {
                    const inner = prev[j - 1];
                    row[c] = (2 + inner[0] + inner[1] + inner[2] + inner[3]) % MOD;
                }
            } else {
                row[c] = cur[j - 1][c];
            }
            cur[j] = row;
        }
        const swap = prev;
        prev = cur;
        cur = swap;
    }
    const top = prev[n - 1];
    return (top[0] + top[1] + top[2] + top[3]) % MOD;
};
