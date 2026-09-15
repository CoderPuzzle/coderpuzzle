/**
 * @param {string} s
 * @param {string} pattern
 * @return {number}
 */
var minStartingIndex = function (s, pattern) {
    // A window s[i:i+m] is almost equal to pattern iff its mismatches fit in
    // one slot: with f = forward match length at i (prefix of pattern) and
    // b = backward match length from the window's right end (suffix of
    // pattern), the window matches exactly when f == m, and when
    // f + b >= m - 1 the runs leave at most one character between them,
    // which a single change absorbs. Both tables come from Z-functions:
    // forward over pattern + sep + s; over the reversals, a prefix of the
    // reversed pattern matching at offset n - 1 - (window end) is exactly a
    // common suffix ending at that window end.
    const n = s.length;
    const m = pattern.length;
    const codes = new Array(n);
    for (let i = 0; i < n; i++) {
        codes[i] = s.charCodeAt(i);
    }
    const values = new Array(m + 1 + n);
    for (let i = 0; i < m; i++) {
        values[i] = pattern.charCodeAt(i);
    }
    values[m] = -1;
    for (let i = 0; i < n; i++) {
        values[m + 1 + i] = codes[i];
    }
    const z = zFunction(values);
    const rvalues = new Array(m + 1 + n);
    for (let i = 0; i < m; i++) {
        rvalues[i] = pattern.charCodeAt(m - 1 - i);
    }
    rvalues[m] = -1;
    for (let i = 0; i < n; i++) {
        rvalues[m + 1 + i] = codes[n - 1 - i];
    }
    const r = zFunction(rvalues);
    for (let i = 0; i + m <= n; ++i) {
        const f = Math.min(z[m + 1 + i], m);
        if (f >= m || f + Math.min(r[m + 1 + n - i - m], m) >= m - 1) return i;
    }
    return -1;
};

function zFunction(values) {
    const m = values.length;
    const z = new Array(m).fill(0);
    z[0] = m;
    let left = 0;
    let right = 0;
    for (let i = 1; i < m; i++) {
        if (i < right) {
            z[i] = Math.min(right - i, z[i - left]);
        }
        while (i + z[i] < m && values[z[i]] === values[i + z[i]]) {
            z[i]++;
        }
        if (i + z[i] > right) {
            left = i;
            right = i + z[i];
        }
    }
    return z;
}
