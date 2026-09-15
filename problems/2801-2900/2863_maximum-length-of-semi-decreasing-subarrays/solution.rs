impl Solution {
    pub fn max_subarray_length(nums: Vec<i32>) -> i32 {
        // A subarray nums[j..i] qualifies exactly when j < i and
        // nums[j] > nums[i]; only the two endpoints matter.
        let n = nums.len();
        let mut order: Vec<usize> = (0..n).collect();
        order.sort_by(|&a, &b| nums[b].cmp(&nums[a]));
        let mut best = 0i32;
        // Sentinel n can never beat any real position x <= n - 1.
        let mut min_index = n;
        let mut g = 0;
        while g < n {
            let mut h = g;
            while h < n && nums[order[h]] == nums[order[g]] {
                h += 1;
            }
            // Query first: positions of strictly larger values only, so
            // equal-valued endpoints can never pair with each other.
            for &x in &order[g..h] {
                if min_index < x {
                    let candidate = (x - min_index + 1) as i32;
                    if candidate > best {
                        best = candidate;
                    }
                }
            }
            // Then merge this equal-value group into the running minimum.
            for &x in &order[g..h] {
                if x < min_index {
                    min_index = x;
                }
            }
            g = h;
        }
        best
    }
}
