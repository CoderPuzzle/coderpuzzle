impl Solution {
    pub fn count_odd_letters(n: i32) -> i32 {
        // Spell every digit as its lowercase word, concatenate in digit
        // order, and count letters: the answer is how many distinct
        // characters end up with an odd frequency.
        let words = [
            "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
        ];
        let mut counts = [0i32; 26];
        for digit in n.to_string().chars() {
            for ch in words[digit as usize - '0' as usize].chars() {
                counts[ch as usize - 'a' as usize] += 1;
            }
        }
        counts.iter().filter(|&&count| count % 2 == 1).count() as i32
    }
}
