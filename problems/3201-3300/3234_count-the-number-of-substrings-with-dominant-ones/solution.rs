impl Solution {
    pub fn number_of_substrings(s: String) -> i64 {
        let bytes = s.as_bytes();
        let n = bytes.len();
        let zeros_at: Vec<usize> = (0..n).filter(|&index| bytes[index] == b'0').collect();
        let total_zeros = zeros_at.len();
        let mut answer = 0_i64;
        let mut first_zero = 0_usize;
        for left in 0..n {
            while first_zero < total_zeros && zeros_at[first_zero] < left {
                first_zero += 1;
            }
            if first_zero < total_zeros {
                answer += (zeros_at[first_zero] - left) as i64;
            } else {
                answer += (n - left) as i64;
            }
            let mut need = 1_usize;
            let mut j = 1_usize;
            while need <= n - left && first_zero + j - 1 < total_zeros {
                let mut low = zeros_at[first_zero + j - 1];
                let required = left + need;
                if required > low {
                    low = required;
                }
                let high = if first_zero + j < total_zeros {
                    zeros_at[first_zero + j]
                } else {
                    n
                };
                if high > low {
                    answer += (high - low) as i64;
                }
                j += 1;
                need += 2 * j;
            }
        }
        answer
    }
}
