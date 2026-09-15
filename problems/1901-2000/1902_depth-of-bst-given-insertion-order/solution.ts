// Inverting `order` gives pos[v], and the BST built by inserting in that
// order is exactly the min-Cartesian tree of pos[1..n]: the root is the
// first-inserted value and every subtree spans a contiguous range of
// values. A monotonic stack over values 1..n (pos increasing bottom to
// top) then recovers every parent in O(n) — popping for v, the last value
// popped re-hangs as v's left child, since it is the later-inserted of
// the two value-neighbours v lands between, while a value popped earlier
// keeps the stack-below parent it was given when pushed. Depths fill in
// insertion order afterwards — a parent is always inserted before its
// children — so two flat sweeps, no recursion, cope with the 10^5-deep
// chains the constraints allow.
function maxDepthBST(order: number[]): number {
    const n = order.length;
    const pos = new Int32Array(n + 1);
    for (let i = 0; i < n; i++) {
        pos[order[i]] = i;
    }
    const parent = new Int32Array(n + 1);
    const stack: number[] = [];
    for (let v = 1; v <= n; v++) {
        let last = 0;
        while (stack.length && pos[stack[stack.length - 1]] > pos[v]) {
            last = stack.pop()!;
        }
        if (last) parent[last] = v;
        if (stack.length) parent[v] = stack[stack.length - 1];
        stack.push(v);
    }
    const depth = new Int32Array(n + 1);
    let best = 0;
    for (const v of order) {
        depth[v] = parent[v] ? depth[parent[v]] + 1 : 1;
        if (depth[v] > best) best = depth[v];
    }
    return best;
}
