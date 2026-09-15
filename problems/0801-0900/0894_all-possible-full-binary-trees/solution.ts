function allPossibleFBT(n: number): (TreeNode | null)[] {
    // A full tree's node count is odd: the root alone is 1, and every
    // internal node adds a pair. An even n therefore admits no tree.
    if (n % 2 === 0) {
        return [];
    }
    const memo: Map<number, (TreeNode | null)[]> = new Map();
    const build = (count: number): (TreeNode | null)[] => {
        if (count === 1) {
            return [new TreeNode(0)];
        }
        const done: (TreeNode | null)[] | undefined = memo.get(count);
        if (done !== undefined) {
            return done;
        }
        // The root is fixed; a tree of `count` nodes is a choice of left
        // shape times right shape over every odd split of count - 1 —
        // left sizes ascending, left shapes outermost, exactly the order
        // the statement pins. Subtrees are shared, not copied: emitting a
        // tree links two memoized shapes.
        const trees: (TreeNode | null)[] = [];
        for (let leftCount = 1; leftCount < count - 1; leftCount += 2) {
            const lefts: (TreeNode | null)[] = build(leftCount);
            const rights: (TreeNode | null)[] = build(count - 1 - leftCount);
            for (const left of lefts) {
                for (const right of rights) {
                    const root: TreeNode = new TreeNode(0);
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
}
