impl Solution {
    pub fn count_prefix_suffix_pairs(words: Vec<String>) -> i32 {
        fn is_prefix_and_suffix(str1: &str, str2: &str) -> bool {
            let size1 = str1.len();
            let size2 = str2.len();
            if size1 > size2 {
                return false;
            }
            let (a, b) = (str1.as_bytes(), str2.as_bytes());
            for index in 0..size1 {
                if a[index] != b[index] {
                    return false;
                }
                if a[index] != b[size2 - size1 + index] {
                    return false;
                }
            }
            true
        }

        let mut total = 0_i32;
        for i in 0..words.len() {
            for j in (i + 1)..words.len() {
                if is_prefix_and_suffix(&words[i], &words[j]) {
                    total += 1;
                }
            }
        }
        total
    }
}
