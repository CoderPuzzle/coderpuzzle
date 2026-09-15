impl Solution {
    pub fn num_friend_requests(ages: Vec<i32>) -> i32 {
        // Counting by age value: ages live in 1..120, so bucket every
        // person by age and judge each ordered pair of age values once.
        let mut count = [0i32; 121];
        for &age in &ages {
            count[age as usize] += 1;
        }
        let mut total = 0i32;
        for a in 1..=120 {
            if count[a] == 0 {
                continue;
            }
            for b in 1..=120 {
                if count[b] == 0 {
                    continue;
                }
                // x sends to y iff none of the three blocks holds; the
                // half-age test 2*b <= a + 14 is ages[y] <= 0.5*ages[x] + 7
                // in exact integer arithmetic.
                if 2 * b <= a + 14 || b > a || (b > 100 && a < 100) {
                    continue;
                }
                // Same-age pairs cannot target oneself, so the diagonal
                // counts count*(count - 1), not count*count.
                if a == b {
                    total += count[a] * (count[b] - 1);
                } else {
                    total += count[a] * count[b];
                }
            }
        }
        total
    }
}
