impl Solution {
    pub fn check_almost_equivalent(word1: String, word2: String) -> bool {
        let mut differences = [0_i32; 26];
        for (first, second) in word1.bytes().zip(word2.bytes()) {
            differences[(first - b'a') as usize] += 1;
            differences[(second - b'a') as usize] -= 1;
        }
        differences.iter().all(|difference| difference.abs() <= 3)
    }
}
