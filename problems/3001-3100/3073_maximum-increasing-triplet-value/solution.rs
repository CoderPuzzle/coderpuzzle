impl Solution {
    pub fn maximum_triplet_value(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        // Greatest element strictly to the right of each index.
        let mut suffix = vec![0_i32; n];
        suffix[n - 1] = nums[n - 1];
        for k in (0..n - 1).rev() {
            suffix[k] = suffix[k + 1].max(nums[k]);
        }
        // Fenwick tree over compressed ranks, storing prefix maxima of the
        // values inserted so far; query(rank - 1) yields the greatest earlier
        // value strictly smaller than nums[j].
        let mut distinct = nums.clone();
        distinct.sort_unstable();
        distinct.dedup();
        let size = distinct.len();
        let rank_of = |value: i32| -> usize { distinct.binary_search(&value).unwrap() + 1 };
        let mut tree = vec![0_i32; size + 1];

        // Every triplet value nums[i] - nums[j] + nums[k] stays within
        // (-10^9, 10^9) because nums[i] < nums[j] < nums[k] <= 10^9.
        let mut best = i32::MIN;
        let mut update = |tree: &mut [i32], mut i: usize, value: i32| {
            while i <= size {
                tree[i] = tree[i].max(value);
                i += i & i.wrapping_neg();
            }
        };
        let query = |tree: &[i32], mut i: usize| -> i32 {
            let mut result = 0;
            while i > 0 {
                result = result.max(tree[i]);
                i -= i & i.wrapping_neg();
            }
            result
        };

        update(&mut tree, rank_of(nums[0]), nums[0]);
        for j in 1..n - 1 {
            let left = query(&tree, rank_of(nums[j]) - 1);
            if left > 0 && nums[j] < suffix[j + 1] {
                best = best.max(left - nums[j] + suffix[j + 1]);
            }
            update(&mut tree, rank_of(nums[j]), nums[j]);
        }
        best
    }
}
