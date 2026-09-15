/**
 * @param {number[]} source
 * @param {number[]} target
 * @param {number[][]} allowedSwaps
 * @return {number}
 */
var minimumHammingDistance = function (source, target, allowedSwaps) {
    const n = source.length;
    const parent = new Array(n);
    for (let i = 0; i < n; i++) {
        parent[i] = i;
    }

    const find = (x) => {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };

    // Swaps chain into connected components where values can be permuted
    // arbitrarily, and values never leave their component.
    for (const [a, b] of allowedSwaps) {
        const ra = find(a);
        const rb = find(b);
        if (ra !== rb) {
            parent[ra] = rb;
        }
    }

    const groups = new Map();
    for (let i = 0; i < n; i++) {
        const r = find(i);
        let members = groups.get(r);
        if (!members) {
            members = [];
            groups.set(r, members);
        }
        members.push(i);
    }

    // Per component, match target values against the multiset of source
    // values; each unmatched target must stay different.
    let distance = 0;
    for (const members of groups.values()) {
        const have = new Map();
        for (const i of members) {
            have.set(source[i], (have.get(source[i]) || 0) + 1);
        }
        for (const i of members) {
            const v = target[i];
            const c = have.get(v) || 0;
            if (c > 0) {
                have.set(v, c - 1);
            } else {
                distance += 1;
            }
        }
    }
    return distance;
};
