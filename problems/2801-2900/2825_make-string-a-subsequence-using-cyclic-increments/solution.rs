impl Solution {
    pub fn can_make_subsequence(str1: String, str2: String) -> bool {
        // Walk str1 once with a pointer into str2. Whenever str2[j] equals
        // str1[i], or equals its cyclic successor, take the pair and advance
        // both pointers: claiming the earliest eligible slot never displaces
        // a better later choice, because everything that fits after it also
        // fits after any other valid pick. Matching all of str2 this way is
        // exactly what was asked for.
        let target = str2.as_bytes();
        let mut j = 0;
        for &c in str1.as_bytes() {
            if j < target.len() {
                let d = (target[j] as i32 - c as i32 + 26) % 26;
                if d <= 1 {
                    j += 1;
                }
            }
        }
        j == target.len()
    }
}
