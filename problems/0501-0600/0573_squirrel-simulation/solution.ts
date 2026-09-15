function minDistance(height: number, width: number, tree: number[], squirrel: number[], nuts: number[][]): number {
    // Once the first nut is under the tree, every remaining nut is a
    // tree -> nut -> tree round trip, so 2 * dist(nut, tree) is paid no
    // matter what.
    let total = 0;
    let best = Infinity;
    for (const nut of nuts) {
        const toTree = Math.abs(nut[0] - tree[0]) + Math.abs(nut[1] - tree[1]);
        total += 2 * toTree;
        // Starting with this nut instead swaps one round trip for
        // squirrel -> nut -> tree, changing the total by the detour
        // dist(squirrel, nut) - dist(nut, tree).
        const detour = Math.abs(nut[0] - squirrel[0]) + Math.abs(nut[1] - squirrel[1]) - toTree;
        best = Math.min(best, detour);
    }
    return total + best;
}
