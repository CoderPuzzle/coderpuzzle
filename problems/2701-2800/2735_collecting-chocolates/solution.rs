impl Solution {
    // Try every rotation count k in [0, n): after k operations, buying
    // type t costs nums[(t - k) mod n], so each step only adds one new
    // candidate price per type on top of the ones already seen.
    pub fn min_cost(nums: Vec<i32>, x: i32) -> i64 {
        let n = nums.len();
        // cheapest[t] tracks the lowest price seen so far for type t; totals
        // reach about 2 * 10^12, so accumulate in i64.
        let mut cheapest: Vec<i64> = nums.iter().map(|&price| price as i64).collect();
        let mut answer: i64 = cheapest.iter().sum();
        for rotations in 1..n {
            let mut total = 0i64;
            for t in 0..n {
                let price = nums[(t + n - rotations) % n] as i64;
                if price < cheapest[t] {
                    cheapest[t] = price;
                }
                total += cheapest[t];
            }
            answer = answer.min(total + rotations as i64 * x as i64);
        }
        answer
    }
}
