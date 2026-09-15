impl Solution {
    pub fn sum_of_floored_pairs(nums: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        if nums.is_empty() {
            return 0;
        }
        let max_val = *nums.iter().max().unwrap() as usize;
        let mut count = vec![0i64; max_val + 1];
        for &v in &nums {
            count[v as usize] += 1;
        }
        let mut prefix = vec![0i64; max_val + 1];
        let mut running = 0i64;
        for v in 0..=max_val {
            running += count[v];
            prefix[v] = running;
        }
        let mut total = 0i64;
        for y in 1..=max_val {
            if count[y] == 0 {
                continue;
            }
            // sum over x of floor(x / y) * count[x]
            // = sum over m >= 1 of #{x : x >= m * y}
            let mut c = 0i64;
            let mut m = y;
            while m <= max_val {
                c += prefix[max_val] - prefix[m - 1];
                m += y;
            }
            total = (total + count[y] * c) % MOD;
        }
        total as i32
    }
}
