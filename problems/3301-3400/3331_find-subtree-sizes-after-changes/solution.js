/**
 * @param {number[]} parent
 * @param {string} s
 * @return {number[]}
 */
var findSubtreeSizes = function (parent, s) {
    const n = parent.length;
    const children = Array.from({ length: n }, () => []);
    for (let i = 1; i < n; i++) children[parent[i]].push(i);

    // Iterative DFS from the root. last[c] is the closest ancestor of the
    // current node holding character c; entering v saves it on the stack
    // (paired with v) and the exit visit restores it, so last[] always
    // describes the current root-to-v path. The changes are simultaneous
    // and every rewiring points at an original ancestor, so resolving
    // each node against the original tree is exact.
    const last = new Array(26).fill(-1);
    const newparent = new Array(n).fill(-1);
    const pre = [];
    const stack = [[0, -2]]; // [node, ENTER]
    const ENTER = -2;
    while (stack.length > 0) {
        const [v, saved] = stack.pop();
        const c = s.charCodeAt(v) - 97;
        if (saved === ENTER) {
            pre.push(v);
            newparent[v] = last[c] !== -1 ? last[c] : parent[v];
            stack.push([v, last[c]]);
            last[c] = v;
            for (const ch of children[v]) stack.push([ch, ENTER]);
        } else {
            last[c] = saved;
        }
    }

    // Each new parent precedes v in preorder, so consuming preorder in
    // reverse folds subtree sizes up the final tree in one pass.
    const size = new Array(n).fill(1);
    for (let i = n - 1; i >= 1; i--) {
        const v = pre[i];
        const p = newparent[v];
        if (p >= 0) size[p] += size[v];
    }
    return size;
};
