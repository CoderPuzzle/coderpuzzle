impl Solution {
    pub fn maximum_xor(s: String, t: String) -> String {
        let n = s.len();
        let s_ones = s.bytes().filter(|&b| b == b'1').count();
        let t_ones = t.bytes().filter(|&b| b == b'1').count();
        // Ones of t that can land on s's '0' positions and zeros of t that
        // can land on s's '1' positions — the largest pair of opposite-bit
        // counts the two multisets allow, maxed together.
        let mut ones_on_zeros = t_ones.min(n - s_ones);
        let mut zeros_on_ones = (n - t_ones).min(s_ones);
        // Greedy left-to-right fill: spend an opposite bit at each position
        // while its class still has one, which pushes every achievable XOR
        // one as far left as it can go. Inputs are '0'/'1' bytes.
        let mut result = String::with_capacity(n);
        for ch in s.bytes() {
            if ch == b'0' {
                if ones_on_zeros > 0 {
                    result.push('1');
                    ones_on_zeros -= 1;
                } else {
                    result.push('0');
                }
            } else if zeros_on_ones > 0 {
                result.push('1');
                zeros_on_ones -= 1;
            } else {
                result.push('0');
            }
        }
        result
    }
}
