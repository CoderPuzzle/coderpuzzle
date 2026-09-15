impl Solution {
    pub fn min_swaps(nums: Vec<i32>) -> i64 {
        // Only parity matters. In any target alternating pattern the
        // k-th even (in current order) must land on the k-th even slot
        // — crossings among equal-parity elements never pay — and each
        // adjacent swap moves exactly one even by one position, so a
        // pattern's cost is the sum |even index - even slot| (the odds
        // mirror the evens). Try both patterns; a pattern is feasible
        // only when its even-slot count equals the even count, which
        // also encodes the |evenCnt - oddCnt| > 1 impossibility.
        // Accumulate in i64: costs approach n^2/8 ~ 1.25e9.
        let n = nums.len();
        let evens: Vec<usize> = (0..n).filter(|&i| nums[i] % 2 == 0).collect();
        let k = evens.len();
        let mut best: i64 = -1;
        for start in 0..=1i64 {
            if ((n as i64 - start + 1) / 2) as usize != k {
                continue;
            }
            let mut cost: i64 = 0;
            for (j, &e) in evens.iter().enumerate() {
                cost += (e as i64 - (start + 2 * j as i64)).abs();
            }
            if best < 0 || cost < best {
                best = cost;
            }
        }
        best
    }
}
