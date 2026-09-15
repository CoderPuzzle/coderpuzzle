impl Solution {
    pub fn min_cost(arr: Vec<i32>, brr: Vec<i32>, k: i64) -> i64 {
        // Splitting into singleton blocks already realizes any
        // permutation, so one paid rearrangement is all Operation 1 can
        // offer; matching sorted to sorted then minimizes sum |a - b|
        // over permutations. The answer is the cheaper of leaving arr put
        // and paying k plus that matched cost. Sums reach 2 * 10^10 and
        // k itself is up to 2 * 10^10, so everything widens to i64.
        let direct: i64 = arr.iter().zip(&brr).map(|(&a, &b)| (a as i64 - b as i64).abs()).sum();
        let mut sa = arr.clone();
        let mut sb = brr.clone();
        sa.sort();
        sb.sort();
        let matched = k + sa
            .iter()
            .zip(&sb)
            .map(|(&a, &b)| (a as i64 - b as i64).abs())
            .sum::<i64>();
        direct.min(matched)
    }
}
