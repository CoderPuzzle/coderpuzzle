/**
 * @param {TreeNode[]} trees
 * @return {TreeNode}
 */
var canMerge = function (trees) {
    // The final root is the unique root value that never appears as a leaf
    // of another tree; duplicate leaf values make merging impossible
    // outright, since a valid BST holds each value exactly once.
    const leafSeen = new Set();
    for (const root of trees) {
        for (const child of [root.left, root.right]) {
            if (child !== null) {
                if (leafSeen.has(child.val)) {
                    return null;
                }
                leafSeen.add(child.val);
            }
        }
    }
    let root = null;
    let candidates = 0;
    for (const r of trees) {
        if (!leafSeen.has(r.val)) {
            root = r;
            candidates++;
        }
    }
    if (candidates !== 1) {
        return null;
    }

    // by_val maps every live node value to its node; splicing a tree in
    // registers the incoming nodes so later trees can chain onto them.
    const byVal = new Map();
    const stack = [root];
    while (stack.length > 0) {
        const nd = stack.pop();
        byVal.set(nd.val, nd);
        if (nd.left !== null) {
            stack.push(nd.left);
        }
        if (nd.right !== null) {
            stack.push(nd.right);
        }
    }

    const pending = trees.filter((t) => t !== root);
    while (pending.length > 0) {
        const rest = [];
        let progressed = false;
        for (const tree of pending) {
            const host = byVal.get(tree.val);
            // A host must be a true leaf other than the final root.
            if (host !== undefined && host !== root && host.left === null && host.right === null) {
                host.left = tree.left;
                host.right = tree.right;
                const sub = [tree];
                while (sub.length > 0) {
                    const nd = sub.pop();
                    byVal.set(nd.val, nd);
                    if (nd.left !== null) {
                        sub.push(nd.left);
                    }
                    if (nd.right !== null) {
                        sub.push(nd.right);
                    }
                }
                progressed = true;
            } else {
                rest.push(tree);
            }
        }
        if (!progressed) {
            return null;
        }
        pending.length = 0;
        pending.push(...rest);
    }

    // Validate: strict in-order increase proves BST ordering and that every
    // value is distinct; the distinct-value count proves all n - 1 merges
    // actually landed inside one connected tree. Iterative walk, safe at
    // n = 5*10^4.
    let prev = -1;
    let seen = 0;
    const stack2 = [];
    let cur = root;
    while (stack2.length > 0 || cur !== null) {
        while (cur !== null) {
            stack2.push(cur);
            cur = cur.left;
        }
        cur = stack2.pop();
        if (prev >= 0 && cur.val <= prev) {
            return null;
        }
        prev = cur.val;
        seen++;
        cur = cur.right;
    }
    if (seen !== byVal.size) {
        return null;
    }
    return root;
};
