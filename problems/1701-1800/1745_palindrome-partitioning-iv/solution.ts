// isPal[l][r] marks s[l..r] as a palindrome; entries are filled by
// increasing length so each one depends on a shorter interval. Three
// non-empty parts are fixed by two cuts i and j; every cut pair is tried
// against the table.
function checkPartitioning(s: string): boolean {
    const n = s.length;
    const isPal: boolean[][] = Array.from({ length: n }, () => new Array<boolean>(n).fill(false));
    for (let i = 0; i < n; ++i) isPal[i][i] = true;
    for (let i = 0; i + 1 < n; ++i) {
        if (s[i] === s[i + 1]) isPal[i][i + 1] = true;
    }
    for (let length = 3; length <= n; ++length) {
        for (let l = 0; l + length <= n; ++l) {
            const r = l + length - 1;
            if (s[l] === s[r] && isPal[l + 1][r - 1]) isPal[l][r] = true;
        }
    }
    for (let i = 1; i < n - 1; ++i) {
        if (!isPal[0][i - 1]) continue;
        for (let j = i + 1; j < n; ++j) {
            if (isPal[i][j - 1] && isPal[j][n - 1]) return true;
        }
    }
    return false;
}
