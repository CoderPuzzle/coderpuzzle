impl Solution {
    pub fn two_sum(numbers: Vec<i32>, target: i32) -> Vec<i32> {
        let n = numbers.len();
        for i in 0..n - 1 {
            let complement = target - numbers[i];
            // The sorted remainder numbers[i+1..] is the only legal partner
            // range: a position cannot pair with itself.
            let (mut lo, mut hi) = (i + 1, n - 1);
            while lo <= hi {
                let mid = lo + (hi - lo) / 2;
                if numbers[mid] == complement {
                    // 1-based indices, smaller position first.
                    return vec![i as i32 + 1, mid as i32 + 1];
                } else if numbers[mid] < complement {
                    lo = mid + 1;
                } else {
                    hi = mid - 1;
                }
            }
        }
        // Unreachable under the uniqueness promise; keeps the function total.
        Vec::new()
    }
}
