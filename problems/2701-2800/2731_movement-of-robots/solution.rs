impl Solution {
    pub fn sum_distance(nums: Vec<i32>, s: String, d: i32) -> i32 {
        // Collisions only swap identities, so final positions are x +/- d.
        const MOD: i64 = 1_000_000_007;
        let mut pos: Vec<i64> = nums
            .iter()
            .enumerate()
            .map(|(i, &x)| {
                let dd = d as i64;
                if s.as_bytes()[i] == b'R' {
                    x as i64 + dd
                } else {
                    x as i64 - dd
                }
            })
            .collect();
        pos.sort();
        let mut total: i64 = 0;
        let mut prefix: i64 = 0;
        for (i, &p) in pos.iter().enumerate() {
            total += p * i as i64 - prefix;
            total %= MOD;
            prefix += p;
        }
        let ans = total.rem_euclid(MOD);
        ans as i32
    }
}
