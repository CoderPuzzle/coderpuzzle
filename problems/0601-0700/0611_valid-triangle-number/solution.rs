impl Solution {
    pub fn triangle_number(nums: Vec<i32>) -> i32 {
        let mut sorted = nums;
        sorted.sort();
        let n = sorted.len();
        let mut count: i64 = 0;
        // Fix the largest side; sorted order leaves a + b > c as the only check needed.
        for i in (2..n).rev() {
            // First zero seen from the top means every remaining side is 0 too.
            if sorted[i] == 0 {
                break;
            }
            let mut lo = 0usize;
            let mut hi = i - 1;
            while lo < hi {
                if sorted[lo] + sorted[hi] > sorted[i] {
                    // Sum already suffices at the leftmost lo, so every index
                    // up to hi - 1 also pairs with hi: hi - lo triplets at once.
                    count += (hi - lo) as i64;
                    hi -= 1;
                } else {
                    // Too small even at the rightmost partner; only lo can move up.
                    lo += 1;
                }
            }
        }
        count as i32
    }
}
