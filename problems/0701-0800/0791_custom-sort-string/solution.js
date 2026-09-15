/**
 * @param {string} order
 * @param {string} s
 * @return {string}
 */
var customSortString = function (order, s) {
    // How many of each letter s holds; the alphabet is a fixed
    // constant, so 26 slots replace a hash map.
    const counts = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        counts[s.charCodeAt(i) - 97]++;
    }
    const out = [];
    // Emission pass 1: walk order itself, emitting each letter it
    // names as many times as s holds it. order's sequence IS the
    // relative order the answer must carry, so this prefix already
    // satisfies it; letters absent from s contribute nothing. The
    // zeroing doubles as a membership mark for pass 2.
    for (let i = 0; i < order.length; i++) {
        const slot = order.charCodeAt(i) - 97;
        if (counts[slot] > 0) {
            for (let r = 0; r < counts[slot]; r++) {
                out.push(order[i]);
            }
            counts[slot] = 0;
        }
    }
    // Emission pass 2: leftovers. Letters order never mentions are
    // unconstrained, so the pinned form sends them to the tail in
    // their original s order — walk s and keep the still-counted.
    // No sort anywhere — the construction is purely count-based.
    for (let i = 0; i < s.length; i++) {
        const slot = s.charCodeAt(i) - 97;
        if (counts[slot] > 0) {
            out.push(s[i]);
            counts[slot]--;
        }
    }
    return out.join("");
};
