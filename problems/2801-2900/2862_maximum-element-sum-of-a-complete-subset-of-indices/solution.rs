impl Solution {
    pub fn maximum_sum(nums: Vec<i32>) -> i64 {
        fn squarefree_part(mut x: i64) -> i64 {
            // Product of primes with odd exponent in x, e.g. P(18) = 2.
            // Trial division suffices: only indices are factored. Anything
            // surviving the loop is one leftover prime with exponent one.
            let mut result: i64 = 1;
            let mut d: i64 = 2;
            while d * d <= x {
                if x % d == 0 {
                    let mut count = 0;
                    while x % d == 0 {
                        x /= d;
                        count += 1;
                    }
                    if count % 2 == 1 {
                        result *= d;
                    }
                }
                d += 1;
            }
            if x > 1 {
                result *= x;
            }
            result
        }

        // Writing each index as (squarefree part) x (perfect square), the
        // product of two indices is a perfect square exactly when their
        // squarefree parts match — so complete subsets are precisely the
        // indices sharing one squarefree part. Sum per group, take the max;
        // singletons qualify since the pair condition is vacuous.
        let mut groups: std::collections::HashMap<i64, i64> = std::collections::HashMap::new();
        for (i, &v) in nums.iter().enumerate() {
            *groups.entry(squarefree_part(i as i64 + 1)).or_insert(0) += v as i64;
        }
        *groups.values().max().unwrap()
    }
}
