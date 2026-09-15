/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function (g, s) {
    // Both sorted ascending, the least greedy unfed child faces the
    // smallest unassigned cookie: the cheapest pairing worth trying.
    // Numeric comparator — the default sort would order as strings.
    g.sort((a, b) => a - b);
    s.sort((a, b) => a - b);
    let child = 0;
    for (const cookie of s) {
        // A cookie too small for the least greedy remaining child is too
        // small for everyone remaining — skip it. Otherwise feed it.
        if (child < g.length && cookie >= g[child]) {
            ++child;
        }
    }
    return child;
};
