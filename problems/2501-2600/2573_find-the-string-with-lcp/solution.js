/**
 * @param {number[][]} lcp
 * @return {string}
 */
var findTheString = function (lcp) {
    // A real matrix is symmetric; reject fakes up front so only the lower
    // triangle needs checking later.
    const n = lcp.length;
    const transposed = lcp[0].map((_, c) => lcp.map((row) => row[c]));
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
            if (transposed[i][j] !== lcp[i][j]) return "";
        }
    }
    // Positive entries weld indices into letter-equality classes:
    // word[i] === word[j] iff lcp[i][j] > 0. Flood-fill those classes.
    const group = new Array(n).fill(-1);
    let groups = 0;
    for (let i = 0; i < n; ++i) {
        if (group[i] >= 0) continue;
        group[i] = groups;
        const stack = [i];
        while (stack.length > 0) {
            const u = stack.pop();
            const row = lcp[u];
            for (let v = 0; v < n; ++v) {
                if (row[v] > 0 && group[v] < 0) {
                    group[v] = groups;
                    stack.push(v);
                }
            }
        }
        ++groups;
    }
    if (groups > 26) return "";
    // Cross-class order is unconstrained, so the alphabetically smallest
    // candidate numbers the classes by first appearance.
    const label = new Map();
    const code = new Array(n).fill(0);
    let nxt = 97;
    for (let i = 0; i < n; ++i) {
        if (!label.has(group[i])) {
            label.set(group[i], nxt);
            ++nxt;
        }
        code[i] = label.get(group[i]);
    }
    // Rebuild dp[i][j] = lcp(word[i:], word[j:]) bottom-up and require an
    // exact match on every stored entry; a fabricated matrix fails here
    // even when its positivity structure looked consistent.
    let below = new Array(n + 1).fill(0); // row i+1; trailing slot stays 0
    for (let i = n - 1; i >= 0; --i) {
        const ci = code[i];
        const cur = new Array(n + 1).fill(0);
        const target = lcp[i];
        for (let j = i; j >= 0; --j) {
            if (code[j] === ci) cur[j] = below[j + 1] + 1;
            if (cur[j] !== target[j]) return "";
        }
        below = cur;
    }
    return String.fromCharCode(...code);
};
