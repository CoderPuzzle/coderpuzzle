impl Solution {
    pub fn max_number_of_balloons(text: String) -> i32 {
        let mut counts = [0i32; 26];
        for b in text.bytes() {
            counts[(b - b'a') as usize] += 1;
        }
        // balloon needs b, a, n once and l, o twice; the scarcest letter
        // caps the whole word.
        counts[(b'b' - b'a') as usize]
            .min(counts[(b'a' - b'a') as usize])
            .min(counts[(b'n' - b'a') as usize])
            .min(counts[(b'l' - b'a') as usize] / 2)
            .min(counts[(b'o' - b'a') as usize] / 2)
    }
}
