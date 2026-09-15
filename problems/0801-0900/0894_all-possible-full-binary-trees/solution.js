/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var allPossibleFBT = function (n) {
    // A full tree's node count is odd: the root alone is 1, and every
    // internal node adds a pair. An even n therefore admits no tree.
    if (n % 2 === 0) {
        return [];
    }
    const memo = new Map();
    const build = (count) => {
        if (count === 1) {
            return [new TreeNode(0)];
        }
        if (memo.has(count)) {
            return memo.get(count);
        }
        // The root is fixed; a tree of `count` nodes is a choice of left
        // shape times right shape over every odd split of count - 1 —
        // left sizes ascending, left shapes outermost, exactly the order
        // the statement pins. Subtrees are shared, not copied: emitting a
        // tree links two memoized shapes.
        const trees = [];
        for (let leftCount = 1; leftCount < count - 1; leftCount += 2) {
            const lefts = build(leftCount);
            const rights = build(count - 1 - leftCount);
            for (const left of lefts) {
                for (const right of rights) {
                    const root = new TreeNode(0);
                    root.left = left;
                    root.right = right;
                    trees.push(root);
                }
            }
        }
        memo.set(count, trees);
        // The recursion steps count down by 2, so it nests at most
        // n / 2 + 1 frames deep — 11 at the constraint's n = 20.
        return trees;
    };
    return build(n);
};
