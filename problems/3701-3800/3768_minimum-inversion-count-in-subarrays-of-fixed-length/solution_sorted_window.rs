impl Solution {
    pub fn min_inversion_count(nums: Vec<i32>, k: i32) -> i64 {
        // Keep the current window as a sorted vector. A sorted vector makes
        // the slide's two rank questions direct binary searches: the
        // position an element occupies IS the number of elements smaller
        // than it, and the gap it is dropped into counts the elements
        // greater than it. The running inversion count moves by the same
        // two terms the Fenwick tree tracks, but each term is read off one
        // bisection — no tree, no compression, and the window itself stays
        // materialized. The trade is the O(k) element shift per insert and
        // remove; with k up to n that is quadratic in the worst case but so
        // cache-friendly that mid-size windows stay fast.
        //
        // Equal values need care at both ends: removing uses the leftmost
        // matching position so exactly one copy leaves, inserting uses the
        // rightmost so the newcomer lands after its equals and only pairs
        // with strictly larger survivors.
        let n = nums.len();
        let k = k as usize;
        // The running count reaches k * (k - 1) / 2 — past 2^31 when the
        // window grows past ~65535 elements — so accumulate in 64 bits.
        let mut window: Vec<i32> = Vec::with_capacity(k);
        let mut inversions = 0i64;
        for &x in &nums[..k] {
            let pos = window.partition_point(|&w| w <= x);
            inversions += (window.len() - pos) as i64;
            window.insert(pos, x);
        }
        let mut best = inversions;
        for right in k..n {
            let out_pos = window.partition_point(|&w| w < nums[right - k]);
            inversions -= out_pos as i64;
            window.remove(out_pos);
            let in_pos = window.partition_point(|&w| w <= nums[right]);
            inversions += (window.len() - in_pos) as i64;
            window.insert(in_pos, nums[right]);
            if inversions < best {
                best = inversions;
            }
        }
        best
    }
}
