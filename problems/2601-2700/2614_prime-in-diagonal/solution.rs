impl Solution {
    // Only the two diagonals can contribute, so walk both index legs
    // once and keep the largest value that survives a primality test.
    // Trial division by 2 and then odd factors up to sqrt(value) caps
    // each check near 2000 steps, since values never exceed 4*10^6.
    pub fn diagonal_prime(nums: Vec<Vec<i32>>) -> i32 {
        fn is_prime(value: u32) -> bool {
            if value < 2 {
                return false;
            }
            if value % 2 == 0 {
                return value == 2;
            }
            let mut factor: u64 = 3;
            while factor * factor <= value as u64 {
                if value % (factor as u32) == 0 {
                    return false;
                }
                factor += 2;
            }
            true
        }

        let mut best = 0;
        let size = nums.len();
        for i in 0..size {
            let primary = nums[i][i];
            let secondary = nums[i][size - 1 - i];
            if is_prime(primary as u32) && primary > best {
                best = primary;
            }
            if is_prime(secondary as u32) && secondary > best {
                best = secondary;
            }
        }
        best
    }
}
