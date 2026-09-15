function longestPalindrome(s: string, t: string): number {
    const n = s.length;
    const m = t.length;
    // palS[i][j] (palT[i][j]) records whether s[i..j] (t[i..j]) is a
    // palindrome; the tables also give single-string answers, since either
    // substring may be empty. Padding rows keep the below-row in bounds.
    const palS: boolean[][] = Array.from({ length: n + 1 }, () => new Array<boolean>(n + 1).fill(false));
    let best = 0;
    for (let i = n - 1; i >= 0; --i) {
        palS[i][i] = true;
        for (let j = i + 1; j < n; ++j) {
            palS[i][j] = s[i] === s[j] && (j === i + 1 || palS[i + 1][j - 1]);
        }
        for (let j = n - 1; j >= i; --j) {
            if (palS[i][j]) {
                best = Math.max(best, j - i + 1);
                break;
            }
        }
    }
    const palT: boolean[][] = Array.from({ length: m + 1 }, () => new Array<boolean>(m + 1).fill(false));
    for (let i = m - 1; i >= 0; --i) {
        palT[i][i] = true;
        for (let j = i + 1; j < m; ++j) {
            palT[i][j] = t[i] === t[j] && (j === i + 1 || palT[i + 1][j - 1]);
        }
        for (let j = m - 1; j >= i; --j) {
            if (palT[i][j]) {
                best = Math.max(best, j - i + 1);
                break;
            }
        }
    }
    // Enumerate every pair of non-empty substrings. The concatenation
    // s[i..i2] + t[j..j2] is a palindrome iff the shorter side mirrors the
    // longer one and the leftover piece is itself a palindrome.
    for (let i = 0; i < n; ++i) {
        for (let i2 = i; i2 < n; ++i2) {
            const la = i2 - i + 1;
            for (let j = 0; j < m; ++j) {
                for (let j2 = j; j2 < m; ++j2) {
                    const lb = j2 - j + 1;
                    if (la + lb <= best) continue;
                    const limit = la < lb ? la : lb;
                    let ok = true;
                    for (let k = 0; k < limit; ++k) {
                        if (s[i + k] !== t[j2 - k]) {
                            ok = false;
                            break;
                        }
                    }
                    if (!ok) continue;
                    if (la === lb) {
                        best = la + lb;
                    } else if (la > lb && palS[i + lb][i2]) {
                        best = la + lb;
                    } else if (la < lb && palT[j][j2 - la]) {
                        best = la + lb;
                    }
                }
            }
        }
    }
    return best;
}
