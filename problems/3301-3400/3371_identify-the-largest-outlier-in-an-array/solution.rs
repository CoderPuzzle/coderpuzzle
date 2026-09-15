use std::collections::HashMap;

impl Solution {
    pub fn get_largest_outlier(nums: Vec<i32>) -> i32 {
        // With specials summing to S and outlier o, the array total is
        // 2*S + o (hint 1), so a candidate outlier c is potential exactly
        // when total - c is even and s = (total - c) / 2 occurs at another
        // index — two copies when s equals c (hint 2). Values are bounded
        // (+/-1000, n <= 10^5), so |total| <= 10^8 fits an i32.
        let mut total: i32 = 0;
        let mut count: HashMap<i32, i32> = HashMap::new();
        for &v in &nums {
            total += v;
            *count.entry(v).or_insert(0) += 1;
        }
        let mut best = -2000; // strictly below every legal value
        for &c in &nums {
            let rest = total - c;
            if rest % 2 != 0 {
                continue;
            }
            let s = rest / 2;
            let need = if s == c { 2 } else { 1 };
            if count.get(&s).copied().unwrap_or(0) >= need && c > best {
                best = c;
            }
        }
        best
    }
}
