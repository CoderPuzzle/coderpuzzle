impl Solution {
    pub fn maximum_sum_of_heights(heights: Vec<i32>) -> i64 {
        // best[i] = heaviest sum of a non-decreasing ramp ending at i with
        // tower i kept at full height; one stack sweep per direction gives
        // every peak candidate in O(n) total.
        let mut reversed = heights.clone();
        reversed.reverse();
        let left = ramp_sums(&heights);
        let mut right = ramp_sums(&reversed);
        right.reverse(); // back to original indices
        let mut best = 0i64;
        for i in 0..heights.len() {
            // Tower i sits in both ramps when it is the peak, so its own
            // height is counted once per direction and must be subtracted.
            best = best.max(left[i] + right[i] - heights[i] as i64);
        }
        best
    }
}

// A stack of (height, width) runs holds the clamped prefix; popping taller
// runs re-stamps those towers at the current, lower height in one multiply
// instead of touching them one by one.
fn ramp_sums(nums: &[i32]) -> Vec<i64> {
    let mut best = vec![0i64; nums.len()];
    let mut runs: Vec<(i64, i64)> = Vec::new(); // strictly rising heights
    let mut total = 0i64;
    for (i, &h) in nums.iter().enumerate() {
        let h = h as i64;
        let mut width = 1i64;
        while let Some(&(top_h, top_w)) = runs.last() {
            if top_h < h {
                break;
            }
            total -= top_h * top_w;
            width += top_w;
            runs.pop();
        }
        total += h * width;
        runs.push((h, width));
        best[i] = total;
    }
    best
}
