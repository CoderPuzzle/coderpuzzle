impl Solution {
    pub fn longest_palindrome(words: Vec<String>) -> i32 {
        let mut waiting = [[0_i32; 26]; 26];
        let mut length = 0;
        for word in words {
            let bytes = word.as_bytes();
            let first = usize::from(bytes[0] - b'a');
            let second = usize::from(bytes[1] - b'a');
            if waiting[second][first] > 0 {
                waiting[second][first] -= 1;
                length += 4;
            } else {
                waiting[first][second] += 1;
            }
        }
        if (0..26).any(|letter| waiting[letter][letter] > 0) {
            length += 2;
        }
        length
    }
}
