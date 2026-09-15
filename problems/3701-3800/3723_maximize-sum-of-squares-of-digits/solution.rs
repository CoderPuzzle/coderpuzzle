impl Solution {
    pub fn max_sum_of_squares(num: i32, sum: i32) -> String {
        // Even nine in every position falls short: no good integer exists.
        if sum > 9 * num {
            return String::new();
        }
        // The optimal digits are forced — floor(sum / 9) nines plus at most
        // one leftover r — and descending order is the largest arrangement,
        // so lay them out from the left and pad with zeros.
        let (q, r) = (sum / 9, sum % 9);
        let mut result = vec![b'9'; q as usize];
        if r > 0 {
            result.push(b'0' + r as u8);
        }
        result.resize(num as usize, b'0');
        String::from_utf8(result).unwrap()
    }
}
