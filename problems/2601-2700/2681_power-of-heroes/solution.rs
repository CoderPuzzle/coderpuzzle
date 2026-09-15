impl Solution {
    pub fn sum_of_power(nums: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let mut a: Vec<i64> = nums.iter().map(|&x| x as i64).collect();
        a.sort();
        let mut ans: i64 = 0;
        // s = sum of v * 2^(elements after v) over the processed prefix:
        // each earlier minimum's (minimum, padding) variants collapsed into
        // one accumulator, so a group's power x^2 * min is summed without
        // enumerating subsets.
        let mut s: i64 = 0;
        for &x in &a {
            // x is the group maximum here; the + x covers the singleton
            // group where x is its own minimum. Folded under the modulus
            // since raw values reach (10^9)^3.
            ans = (ans + (x * x % MOD) * ((s + x) % MOD)) % MOD;
            // Advancing the sweep: every existing combination survives with
            // or without x as padding (doubling s), and x registers as a
            // fresh minimum.
            s = (2 * s + x) % MOD;
        }
        ans as i32
    }
}
