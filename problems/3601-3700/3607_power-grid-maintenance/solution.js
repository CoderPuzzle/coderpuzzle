/**
 * @param {number} c
 * @param {number[][]} connections
 * @param {number[][]} queries
 * @return {number[]}
 */
var processQueries = function (c, connections, queries) {
    // Union-Find assigns every station its fixed grid; an offline station
    // stays in its grid, so connectivity never changes.
    const parent = new Array(c + 1);
    const size = new Array(c + 1).fill(1);
    for (let i = 1; i <= c; ++i) parent[i] = i;
    const find = (x) => {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };
    const unite = (a, b) => {
        let ra = find(a),
            rb = find(b);
        if (ra === rb) return;
        if (size[ra] < size[rb]) [ra, rb] = [rb, ra];
        parent[rb] = ra;
        size[ra] += size[rb];
    };
    for (const [a, b] of connections) unite(a, b);

    // Group stations by component root, each group sorted ascending.
    const groups = new Map();
    for (let x = 1; x <= c; ++x) {
        const r = find(x);
        if (!groups.has(r)) groups.set(r, []);
        groups.get(r).push(x);
    }
    const components = [];
    const compOf = new Array(c + 1).fill(0);
    for (const members of groups.values()) {
        members.sort((a, b) => a - b);
        const ci = components.length;
        for (const m of members) compOf[m] = ci;
        components.push(members);
    }

    const online = new Array(c + 1).fill(true);
    // ptr[i] is the smallest index into components[i] that is still online;
    // stations only go offline, so it moves monotonically forward.
    const ptr = new Array(components.length).fill(0);

    const answer = [];
    for (const q of queries) {
        const x = q[1];
        if (q[0] === 1) {
            if (online[x]) {
                // An online station resolves the check by itself, even if
                // a smaller station in the same grid is online.
                answer.push(x);
            } else {
                const members = components[compOf[x]];
                const p = ptr[compOf[x]];
                answer.push(p < members.length ? members[p] : -1);
            }
        } else if (online[x]) {
            online[x] = false;
            const ci = compOf[x];
            const members = components[ci];
            // Only a hit on the current minimum forces the pointer on.
            if (members[ptr[ci]] === x) {
                let p = ptr[ci];
                while (p < members.length && !online[members[p]]) ++p;
                ptr[ci] = p;
            }
        }
    }
    return answer;
};
