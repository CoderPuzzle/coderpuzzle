function smallestFromLeaf(root: TreeNode | null): string {
    // Every root-to-leaf path, read backwards, is one candidate, and the
    // answer is the smallest of them — plain lexicographic order, in
    // which a strict prefix counts as smaller ("ab" < "aba"). One shared
    // path buffer holds a character per active root->node frame:
    // descending appends, unwinding pops, so no frame ever carries a copy
    // of its parent's path, and the buffer is reversed into a candidate
    // string only at a leaf.
    // Iterative on purpose: the 8500-node chain the constraints allow
    // overflows the small stacks the judge hands this runtime; the
    // explicit stack is one entry per node or unwind marker and never
    // nests a call.
    let best: string | null = null;
    // The path buffer holds one character per active frame, root -> node.
    const path: string[] = [];
    // A null stack entry unwinds the path one character; a node entry
    // descends into it.
    const pending: (TreeNode | null)[] = [];
    if (root !== null) {
        pending.push(root);
    }
    while (pending.length > 0) {
        const node = pending.pop()!;
        if (node === null) {
            path.pop();
            continue;
        }
        path.push(String.fromCharCode(97 + node.val));
        if (node.left === null && node.right === null) {
            // The `<` operator on strings compares character by character
            // and calls a strict prefix smaller ("ab" < "aba") — exactly
            // the statement's rule.
            const candidate = path.slice().reverse().join("");
            if (best === null || candidate < best) {
                best = candidate;
            }
            path.pop(); // a leaf unwinds its own character
            continue;
        }
        pending.push(null); // unwinds once both subtrees finish
        if (node.right !== null) {
            pending.push(node.right);
        }
        if (node.left !== null) {
            pending.push(node.left);
        }
    }
    return best !== null ? best : "";
}
