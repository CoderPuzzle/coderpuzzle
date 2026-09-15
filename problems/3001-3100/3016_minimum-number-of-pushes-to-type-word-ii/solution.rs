impl Solution {
    pub fn minimum_pushes(word: String) -> i32 {
        let mut counts = [0_i32; 26];
        for letter in word.bytes() {
            counts[(letter - b'a') as usize] += 1;
        }
        counts.sort_unstable_by(|left, right| right.cmp(left));
        let mut answer = 0;
        for (index, &count) in counts.iter().enumerate() {
            answer += count * (index as i32 / 8 + 1);
        }
        answer
    }
}
