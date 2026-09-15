impl Solution {
    pub fn min_operations(nums: Vec<i32>, target: i32) -> i32 {
        // Bucket elements by their power-of-two exponent. Element sums reach
        // 1000 * 2^30, which overflows i32: keep the running total in i64.
        let mut count = [0i64; 62];
        let mut total: i64 = 0;
        for num in nums {
            count[(31 - num.leading_zeros()) as usize] += 1;
            total += num as i64;
        }
        // Every operation preserves the array sum, so a subsequence can never
        // exceed it.
        if total < target as i64 {
            return -1;
        }
        let mut operations: i64 = 0;
        for bit in 0..=30usize {
            if (target >> bit) & 1 == 1 {
                if count[bit] > 0 {
                    count[bit] -= 1;
                } else {
                    let mut source = bit + 1;
                    while count[source] == 0 {
                        source += 1;
                    }
                    // Unreachable given the total check; a defensive stop.
                    if source > 60 {
                        return -1;
                    }
                    operations += (source - bit) as i64;
                    count[source] -= 1;
                    // The split chain banks one spare twin at every passed
                    // level and its own twin right at the needed level.
                    for spare in bit + 1..source {
                        count[spare] += 1;
                    }
                    count[bit] += 1;
                }
            }
            // Leftover pairs at this level stand in for the element one level
            // up, so they feed the next iteration for free.
            count[bit + 1] += count[bit] / 2;
        }
        operations as i32
    }
}
