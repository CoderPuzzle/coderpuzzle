impl Solution {
    pub fn digit_count(num: String) -> bool {
        // One counting pass fills a fixed ten-slot tally; every index then
        // checks the tally against the digit recorded there.
        let bytes = num.as_bytes();
        let mut counts = [0_usize; 10];
        for &byte in bytes {
            counts[(byte - b'0') as usize] += 1;
        }
        for i in 0..bytes.len() {
            if counts[i] != (bytes[i] - b'0') as usize {
                return false;
            }
        }
        true
    }
}
