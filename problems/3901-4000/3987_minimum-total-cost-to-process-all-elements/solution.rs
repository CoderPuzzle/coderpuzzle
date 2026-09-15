impl Solution {
    pub fn minimum_cost(nums: Vec<i32>, k: i32) -> i32 {
        const M: i64 = 1_000_000_007;
        let s: i64 = nums.iter().map(|&x| x as i64).sum();
        let c = ((s + k as i64 - 1) / k as i64 - 1).max(0);
        let (mut a, mut b) = (c, c + 1);
        if a % 2 == 0 {
            a /= 2
        } else {
            b /= 2
        }
        ((a % M) * (b % M) % M) as i32
    }
}
