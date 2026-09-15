impl Solution {
    pub fn count_arrays(digit_sum: Vec<i32>) -> i32 {
        const MOD: i64 = 1000000007;
        // Group every value 0..5000 by the sum of its digits; the groups
        // are sorted, so a prefix sum plus partition_point counts every
        // predecessor whose value is at most a candidate's value in O(log).
        let mut groups: Vec<Vec<i32>> = vec![Vec::new(); 51];
        for value in 0..=5000i32 {
            let mut total = 0;
            let mut rest = value;
            while rest > 0 {
                total += rest % 10;
                rest /= 10;
            }
            groups[total as usize].push(value);
        }
        let mut prev_sum = digit_sum[0] as usize;
        if groups[prev_sum].is_empty() {
            return 0;
        }
        let mut dp: Vec<i64> = vec![1; groups[prev_sum].len()];
        for position in 1..digit_sum.len() {
            let cur_sum = digit_sum[position] as usize;
            if groups[cur_sum].is_empty() {
                return 0;
            }
            let mut prefix = vec![0i64; dp.len() + 1];
            for i in 0..dp.len() {
                prefix[i + 1] = (prefix[i] + dp[i]) % MOD;
            }
            let mut next = Vec::with_capacity(groups[cur_sum].len());
            for &value in &groups[cur_sum] {
                let k = groups[prev_sum].partition_point(|&x| x <= value);
                next.push(prefix[k]);
            }
            dp = next;
            prev_sum = cur_sum;
        }
        dp.iter().fold(0i64, |acc, &ways| (acc + ways) % MOD) as i32
    }
}
