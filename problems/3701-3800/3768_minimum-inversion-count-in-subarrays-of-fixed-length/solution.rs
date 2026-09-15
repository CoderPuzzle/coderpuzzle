use std::collections::HashMap;

impl Solution {
    pub fn min_inversion_count(nums: Vec<i32>, k: i32) -> i64 {
        // Two neighboring windows share k - 1 elements, so the inversion
        // count updates in O(log n) per slide instead of a recount: the
        // element leaving at the front loses its pairs with smaller
        // survivors, the element entering at the back gains pairs with
        // larger survivors. Both are dynamic rank queries over the window's
        // values, so keep the window's elements counted in a Fenwick tree
        // indexed by compressed value.
        //
        // Order matters on every slide: drop the front element from the tree
        // and subtract how many smaller elements it was paired with BEFORE
        // the new element joins, then insert the newcomer and add how many
        // strictly larger elements remain — querying against the wrong
        // intermediate window double-counts when the two values are equal.
        // Strict comparisons throughout: equal neighbors are not inversions.
        let n = nums.len();
        let k = k as usize;
        let mut vals = nums.clone();
        vals.sort();
        vals.dedup();
        let rank: HashMap<i32, usize> = vals.iter().enumerate().map(|(i, &v)| (v, i + 1)).collect();
        let m = vals.len();
        let mut tree = vec![0i32; m + 1];
        // The running count reaches k * (k - 1) / 2 — past 2^31 when the
        // window grows past ~65535 elements — so accumulate in 64 bits.
        fn query(tree: &[i32], mut index: usize) -> i64 {
            let mut total = 0i64;
            while index > 0 {
                total += tree[index] as i64;
                index &= index - 1;
            }
            total
        }
        fn update(tree: &mut [i32], m: usize, mut index: usize, delta: i32) {
            while index <= m {
                tree[index] += delta;
                index += index & index.wrapping_neg();
            }
        }

        // Build the first window; size - prefix(rank) counts elements already
        // inside that are strictly greater than the one being added.
        let mut inversions = 0i64;
        for i in 0..k {
            let rx = rank[&nums[i]];
            inversions += i as i64 - query(&tree, rx);
            update(&mut tree, m, rx, 1);
        }
        let mut best = inversions;
        for right in k..n {
            let ry = rank[&nums[right - k]];
            let rx = rank[&nums[right]];
            inversions -= query(&tree, ry - 1);
            update(&mut tree, m, ry, -1);
            inversions += (k - 1) as i64 - query(&tree, rx);
            update(&mut tree, m, rx, 1);
            if inversions < best {
                best = inversions;
            }
        }
        best
    }
}
