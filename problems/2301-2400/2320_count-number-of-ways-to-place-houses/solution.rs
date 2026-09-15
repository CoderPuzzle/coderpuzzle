impl Solution {
    pub fn count_house_placements(n: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let mut prev: i64 = 1;
        let mut curr: i64 = 2;
        for _ in 1..n {
            let next = (prev + curr) % MOD;
            prev = curr;
            curr = next;
        }
        (curr * curr % MOD) as i32
    }
}
