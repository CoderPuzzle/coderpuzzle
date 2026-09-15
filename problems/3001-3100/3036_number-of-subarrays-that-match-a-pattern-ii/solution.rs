impl Solution {
    pub fn count_matching_subarrays(nums: Vec<i32>, pattern: Vec<i32>) -> i32 {
        // Reduce nums to its sign sequence s of length n - 1: s[t] is 1,
        // 0, or -1 according to nums[t + 1] vs nums[t]. Condition k of the
        // match definition is exactly s[i + k] == pattern[k], so the
        // window starting at i matches iff pattern occurs in s at offset
        // i. Counting windows becomes substring search, linear with KMP.
        let signs: Vec<i32> = nums
            .windows(2)
            .map(|window| (window[1] > window[0]) as i32 - (window[1] < window[0]) as i32)
            .collect();
        let m = pattern.len();
        let mut failure = vec![0usize; m];
        let mut matched = 0usize;
        for index in 1..m {
            while matched > 0 && pattern[index] != pattern[matched] {
                matched = failure[matched - 1];
            }
            if pattern[index] == pattern[matched] {
                matched += 1;
            }
            failure[index] = matched;
        }
        let mut count = 0i64;
        let mut matched = 0usize;
        for &sign in &signs {
            while matched > 0 && sign != pattern[matched] {
                matched = failure[matched - 1];
            }
            if sign == pattern[matched] {
                matched += 1;
            }
            if matched == m {
                // Full occurrence; fall back so overlaps keep counting.
                count += 1;
                matched = failure[matched - 1];
            }
        }
        count as i32
    }
}
