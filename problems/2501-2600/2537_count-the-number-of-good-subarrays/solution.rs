use std::collections::HashMap;

impl Solution {
    pub fn count_good(nums: Vec<i32>, k: i32) -> i64 {
        let mut count: HashMap<i32, i64> = HashMap::new();
        let mut pairs: i64 = 0;
        let mut ans: i64 = 0;
        let mut left: usize = 0;
        let n = nums.len();
        for right in 0..n {
            let x = nums[right];
            // Appending a value already seen c times inside the window forms
            // exactly c new equal pairs; the map plus this running total keep
            // the pair count exact under any window move (hash map because
            // values reach 1e9).
            let c = *count.get(&x).unwrap_or(&0);
            pairs += c;
            count.insert(x, c + 1);
            // Window [left, right] has >= k pairs, so it and every extension
            // of it to the right are good: exactly n - right subarrays share
            // this right endpoint and start at left or later.
            while pairs >= k as i64 {
                ans += (n - right) as i64;
                let y = nums[left];
                // The departing value leaves *cy copies behind, exactly how
                // many pairs its removal destroys.
                let cy = count.get_mut(&y).unwrap();
                *cy -= 1;
                pairs -= *cy;
                left += 1;
            }
        }
        ans
    }
}
