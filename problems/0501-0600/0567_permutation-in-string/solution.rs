impl Solution {
    pub fn check_inclusion(s1: String, s2: String) -> bool {
        let s1 = s1.as_bytes();
        let s2 = s2.as_bytes();
        let (m, n) = (s1.len(), s2.len());
        // No window of length m can exist inside a shorter s2.
        if m > n {
            return false;
        }
        let idx = |b: u8| (b - b'a') as usize;
        let mut need = [0i32; 26];
        let mut window = [0i32; 26];
        for i in 0..m {
            need[idx(s1[i])] += 1;
            window[idx(s2[i])] += 1;
        }
        // Matching frequency vectors means the window is a permutation of s1.
        if window == need {
            return true;
        }
        for i in m..n {
            // Slide one position: add the entering char, drop the leaving one.
            window[idx(s2[i])] += 1;
            window[idx(s2[i - m])] -= 1;
            if window == need {
                return true;
            }
        }
        false
    }
}
