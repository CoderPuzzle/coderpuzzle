impl Solution {
    pub fn min_moves(nums: Vec<i32>, k: i32) -> i32 {
        if k <= 1 {
            return 0;
        }
        let k = k as usize;
        let mut pos: Vec<i64> = Vec::with_capacity(nums.len());
        for (i, &v) in nums.iter().enumerate() {
            if v == 1 {
                pos.push(i as i64);
            }
        }
        let m = pos.len();
        // q[i] = pos[i] - i shifts the i-th one left past the ones before
        // it, so in q-space every one costs exactly one swap per position
        // moved.
        let mut q = vec![0i64; m];
        let mut pref = vec![0i64; m + 1];
        for i in 0..m {
            q[i] = pos[i] - i as i64;
            pref[i + 1] = pref[i] + q[i];
        }
        let mut best = i64::MAX;
        // The optimal group of k ones is consecutive in pos; gather each
        // window on the median of its q values, which minimizes the total
        // L1 distance.
        for i in 0..m + 1 - k {
            let mid = i + k / 2;
            // Left half pulled onto the median, right half symmetrically,
            // both in O(1) via the prefix sums.
            let left = q[mid] * (mid as i64 - i as i64) - (pref[mid] - pref[i]);
            let right = (pref[i + k] - pref[mid + 1]) - q[mid] * ((i + k - 1 - mid) as i64);
            let cost = left + right;
            if cost < best {
                best = cost;
            }
        }
        best as i32
    }
}
