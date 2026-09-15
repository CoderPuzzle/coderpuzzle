use std::collections::HashMap;

impl Solution {
    pub fn path_sum(nums: Vec<i32>) -> i32 {
        // The first two digits of each code are the node's (depth, position);
        // keying a map by them turns the array into the tree itself. A node
        // is a leaf exactly when neither child position exists one level
        // down, and a child at (d, p) hangs from the parent at
        // (d - 1, (p + 1) / 2), so each leaf, walked up to the root,
        // accumulates its whole path.
        let mut tree: HashMap<i32, i32> = HashMap::new();
        for &code in &nums {
            tree.insert(code / 10, code % 10);
        }
        let mut total = 0;
        for &code in &nums {
            let mut d = code / 100;
            let mut p = code / 10 % 10;
            let left = (d + 1) * 10 + 2 * p - 1;
            if tree.contains_key(&left) || tree.contains_key(&(left + 1)) {
                continue;
            }
            while d > 0 {
                total += tree[&(d * 10 + p)];
                p = (p + 1) / 2;
                d -= 1;
            }
        }
        total
    }
}
