impl Solution {
    pub fn maximum_number(num: String, change: Vec<i32>) -> String {
        // Greedy: the leftmost digit change strictly improves is where the
        // mutation must start -- an earlier digit is more significant, so
        // improving it dominates any later start. Extend through every
        // non-hurting digit (change[d] >= d) and stop at the first hurting
        // one, since the mutated substring must stay contiguous.
        let mut digits: Vec<u8> = num.bytes().collect();
        let mut started = false;
        for i in 0..digits.len() {
            let d = (digits[i] - b'0') as usize;
            if change[d] > d as i32 {
                started = true;
                digits[i] = b'0' + change[d] as u8;
            } else if change[d] < d as i32 && started {
                break;
            }
        }
        String::from_utf8(digits).unwrap()
    }
}
