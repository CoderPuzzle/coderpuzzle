impl Solution {
    pub fn min_distance(height: i32, width: i32, tree: Vec<i32>, squirrel: Vec<i32>, nuts: Vec<Vec<i32>>) -> i32 {
        // Once the first nut is under the tree, every remaining nut is a
        // tree -> nut -> tree round trip, so 2 * dist(nut, tree) is paid
        // no matter what.
        let mut total = 0;
        let mut best = i32::MAX;
        for nut in &nuts {
            let to_tree = (nut[0] - tree[0]).abs() + (nut[1] - tree[1]).abs();
            total += 2 * to_tree;
            // Starting with this nut instead swaps one round trip for
            // squirrel -> nut -> tree, changing the total by the detour
            // dist(squirrel, nut) - dist(nut, tree).
            let detour = (nut[0] - squirrel[0]).abs() + (nut[1] - squirrel[1]).abs() - to_tree;
            best = best.min(detour);
        }
        total + best
    }
}
