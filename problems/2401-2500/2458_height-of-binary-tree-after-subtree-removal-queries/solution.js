/**
 * @param {TreeNode} root
 * @param {number[]} queries
 * @return {number[]}
 */
var treeQueries = function (root, queries) {
    if (root === null) return queries.map(() => 0);

    const depth = new Map();
    const height = new Map();
    const submax = new Map();

    // iterative pre-order for depth + post-order for height/submax
    const order = [];
    const stack = [root];
    depth.set(root.val, 0);
    while (stack.length) {
        const u = stack.pop();
        order.push(u);
        if (u.left) {
            depth.set(u.left.val, depth.get(u.val) + 1);
            stack.push(u.left);
        }
        if (u.right) {
            depth.set(u.right.val, depth.get(u.val) + 1);
            stack.push(u.right);
        }
    }

    for (let k = order.length - 1; k >= 0; k--) {
        const u = order[k];
        let h = 0;
        if (u.left) h = Math.max(h, 1 + height.get(u.left.val));
        if (u.right) h = Math.max(h, 1 + height.get(u.right.val));
        height.set(u.val, h);
        let sm = depth.get(u.val) + h;
        if (u.left) sm = Math.max(sm, submax.get(u.left.val));
        if (u.right) sm = Math.max(sm, submax.get(u.right.val));
        submax.set(u.val, sm);
    }

    const ans = new Map();
    const st2 = [[root, -1]];
    while (st2.length) {
        const [u, mx] = st2.pop();
        ans.set(u.val, mx);
        const left = u.left;
        const right = u.right;
        const dv = depth.get(u.val);
        if (left) {
            const hWithoutLeft = right ? 1 + height.get(right.val) : 0;
            let newMx = mx;
            if (dv + hWithoutLeft > newMx) newMx = dv + hWithoutLeft;
            if (right && submax.get(right.val) > newMx) {
                newMx = submax.get(right.val);
            }
            st2.push([left, newMx]);
        }
        if (right) {
            const hWithoutRight = left ? 1 + height.get(left.val) : 0;
            let newMx = mx;
            if (dv + hWithoutRight > newMx) newMx = dv + hWithoutRight;
            if (left && submax.get(left.val) > newMx) {
                newMx = submax.get(left.val);
            }
            st2.push([right, newMx]);
        }
    }

    return queries.map((q) => ans.get(q));
};
