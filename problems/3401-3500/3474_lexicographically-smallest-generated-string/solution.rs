impl Solution {
    pub fn generate_string(str1: String, str2: String) -> String {
        // 'T' windows pin their characters outright: stamp str2 into each
        // one, refusing the instance when two stamps disagree.
        let (s1, t) = (str1.as_bytes(), str2.as_bytes());
        let (n, m) = (s1.len(), t.len());
        let total = n + m - 1;
        let mut word = vec![0u8; total]; // 0 marks "not yet stamped"
        let mut covered = vec![false; total];
        for i in 0..n {
            if s1[i] == b'T' {
                for j in 0..m {
                    let p = i + j;
                    if word[p] != 0 && word[p] != t[j] {
                        return String::new();
                    }
                    word[p] = t[j];
                    covered[p] = true;
                }
            }
        }
        // Every other position takes 'a', the smallest character available.
        for p in 0..total {
            if word[p] == 0 {
                word[p] = b'a';
            }
        }
        // Repair 'F' windows left to right: one that accidentally equals
        // str2 must differ somewhere, and bumping its rightmost free slot
        // from 'a' to 'b' is the smallest change that late in the string.
        for i in 0..n {
            if s1[i] == b'F' && word[i..i + m] == t[..] {
                let mut j = i + m - 1;
                while j >= i && covered[j] {
                    j -= 1;
                }
                if j < i {
                    return String::new(); // fully pinned window that still matches
                }
                word[j] = b'b';
            }
        }
        String::from_utf8(word).unwrap()
    }
}
