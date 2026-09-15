/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {string} s
 * @param {string[]} queries
 * @return {boolean[]}
 */
var palindromePath = function (n, edges, s, queries) {
    // Adjacency lists: two passes over the edge list.
    const adjacency = new Array(n);
    for (let node = 0; node < n; ++node) adjacency[node] = [];
    for (const [u, v] of edges) {
        adjacency[u].push(v);
        adjacency[v].push(u);
    }

    // One iterative depth-first search from node 0 fills every static
    // structure: depth, entry/exit stamps tin/tout over 2n tick positions,
    // and the Euler walk (node on entry and after every child) that the
    // sparse table compresses. The explicit stack keeps a 10^4-deep path
    // off the call stack.
    const depth = new Int32Array(n);
    const tin = new Int32Array(n);
    const tout = new Int32Array(n);
    const first = new Int32Array(n);
    const walk = new Int32Array(2 * n - 1);
    const cursor = new Int32Array(n);
    const seen = new Uint8Array(n);
    let clock = 0;
    let walkLength = 0;
    const stack = [0];
    seen[0] = 1;
    tin[0] = clock++;
    first[0] = walkLength;
    walk[walkLength++] = 0;
    while (stack.length > 0) {
        const node = stack[stack.length - 1];
        if (cursor[node] < adjacency[node].length) {
            const child = adjacency[node][cursor[node]++];
            if (!seen[child]) {
                seen[child] = 1;
                depth[child] = depth[node] + 1;
                tin[child] = clock++;
                first[child] = walkLength;
                walk[walkLength++] = child;
                stack.push(child);
            }
        } else {
            stack.pop();
            tout[node] = clock++;
            if (stack.length > 0) walk[walkLength++] = stack[stack.length - 1];
        }
    }

    // Only letter parities matter, so each node carries a 26-bit mask and
    // path masks combine by XOR. The path mask of u..v is
    // rootMask(u) ^ rootMask(v) ^ letter(lca): the common ancestors cancel
    // between the two root paths, so the LCA's letter returns. rootMask(x)
    // is the XOR of every delta whose node is an ancestor-or-equal of x; on
    // tick positions those are exactly the intervals [tin, tout] containing
    // tin[x], so flipping each delta at tin and tout + 2 makes rootMask(x)
    // a prefix XOR read at tin[x] + 1 — non-ancestor subtrees contribute
    // both flips and cancel. A Fenwick tree over the 2n positions serves
    // reads/flips.
    const size = 2 * n;
    const letters = s.split("");
    const deltaAt = new Int32Array(size + 1);
    for (let node = 0; node < n; ++node) {
        const bit = 1 << (letters[node].charCodeAt(0) - 97);
        deltaAt[tin[node] + 1] ^= bit;
        const closing = tout[node] + 2;
        if (closing <= size) deltaAt[closing] ^= bit;
    }
    const tree = new Int32Array(size + 1);
    const prefix = new Int32Array(size + 1);
    let running = 0;
    for (let position = 1; position <= size; ++position) {
        running ^= deltaAt[position];
        prefix[position] = running;
    }
    for (let position = 1; position <= size; ++position) {
        const low = position & -position;
        tree[position] = prefix[position] ^ prefix[position - low];
    }

    // Sparse table over the Euler walk: packing depth * 2^17 + node makes a
    // plain minimum return the shallowest node of any walk range, which is
    // the LCA. The packed key passes 2^32, past JavaScript's 32-bit bitwise
    // range, so it is built arithmetically — every value stays far below
    // 2^53, where plain numbers are exact.
    let levels = 1;
    while (1 << levels <= walkLength) ++levels;
    const table = [new Array(walkLength)];
    for (let index = 0; index < walkLength; ++index) {
        table[0][index] = depth[walk[index]] * 131072 + walk[index];
    }
    for (let level = 1; level < levels; ++level) {
        const half = 1 << (level - 1);
        const previous = table[level - 1];
        const length = walkLength - (1 << level) + 1;
        const current = new Array(length);
        for (let index = 0; index < length; ++index) {
            const a = previous[index];
            const b = previous[index + half];
            current[index] = a <= b ? a : b;
        }
        table[level] = current;
    }
    const log2 = new Int32Array(walkLength + 1);
    for (let index = 2; index <= walkLength; ++index) log2[index] = log2[index >> 1] + 1;

    const answer = [];
    for (const query of queries) {
        const parts = query.split(" ");
        if (parts[0] === "update") {
            const node = +parts[1];
            const delta = (1 << (letters[node].charCodeAt(0) - 97)) ^ (1 << (parts[2].charCodeAt(0) - 97));
            if (delta !== 0) {
                letters[node] = parts[2];
                for (let position = tin[node] + 1; position <= size; position += position & -position) {
                    tree[position] ^= delta;
                }
                const closing = tout[node] + 2;
                if (closing <= size) {
                    for (let position = closing; position <= size; position += position & -position) {
                        tree[position] ^= delta;
                    }
                }
            }
        } else {
            const u = +parts[1];
            const v = +parts[2];
            let left = first[u];
            let right = first[v];
            if (left > right) {
                const swap = left;
                left = right;
                right = swap;
            }
            const power = log2[right - left + 1];
            const row = table[power];
            let best = row[left];
            const other = row[right - (1 << power) + 1];
            if (other < best) best = other;
            const top = best % 131072;
            let mask = 0;
            for (let position = tin[u] + 1; position > 0; position -= position & -position) {
                mask ^= tree[position];
            }
            for (let position = tin[v] + 1; position > 0; position -= position & -position) {
                mask ^= tree[position];
            }
            mask ^= 1 << (letters[top].charCodeAt(0) - 97);
            // At most one set bit <=> the mask is 0 or a power of two.
            answer.push(mask === 0 || (mask & (mask - 1)) === 0);
        }
    }
    return answer;
};
