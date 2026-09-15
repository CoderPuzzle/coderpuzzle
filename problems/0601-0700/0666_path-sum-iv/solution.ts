function pathSum(nums: number[]): number {
    // The first two digits of each code are the node's (depth, position);
    // keying a Map by them turns the array into the tree itself. A node
    // is a leaf exactly when neither child position exists one level
    // down, and a child at (d, p) hangs from the parent at
    // (d - 1, (p + 1) / 2), so each leaf, walked up to the root,
    // accumulates its whole path.
    const tree = new Map<number, number>();
    for (const code of nums) {
        tree.set(Math.floor(code / 10), code % 10);
    }
    let total = 0;
    for (const code of nums) {
        let d = Math.floor(code / 100);
        let p = Math.floor(code / 10) % 10;
        const left = (d + 1) * 10 + 2 * p - 1;
        if (tree.has(left) || tree.has(left + 1)) {
            continue;
        }
        while (d > 0) {
            total += tree.get(d * 10 + p)!;
            p = Math.floor((p + 1) / 2);
            d -= 1;
        }
    }
    return total;
}
