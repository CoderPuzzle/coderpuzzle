impl Solution {
    pub fn number_of_substrings(s: String) -> i64 {
        let mut counts = [0_i64; 26];
        let mut total = 0_i64;
        for character in s.bytes() {
            let index = (character - b'a') as usize;
            counts[index] += 1;
            total += counts[index];
        }
        total
    }
}
