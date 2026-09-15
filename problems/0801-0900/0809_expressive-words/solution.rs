impl Solution {
    pub fn expressive_words(s: String, words: Vec<String>) -> i32 {
        // Run-length encode s once: its letter spine is what every
        // stretchy word must reproduce, group by group.
        let sb = s.as_bytes();
        let mut s_letters: Vec<u8> = Vec::new();
        let mut s_counts: Vec<usize> = Vec::new();
        let mut i = 0;
        while i < sb.len() {
            let mut j = i;
            while j < sb.len() && sb[j] == sb[i] {
                j += 1;
            }
            s_letters.push(sb[i]);
            s_counts.push(j - i);
            i = j;
        }
        let mut count: i32 = 0;
        for w in &words {
            // Walk w's own groups against s's: same letters, same group
            // count, and per group either equal counts or an s-side
            // count of 3 or more strictly above the word's.
            let wb = w.as_bytes();
            let mut gi = 0;
            let mut k = 0;
            let mut ok = true;
            while k < wb.len() {
                let mut j = k;
                while j < wb.len() && wb[j] == wb[k] {
                    j += 1;
                }
                if gi == s_letters.len() || s_letters[gi] != wb[k] {
                    ok = false;
                    break;
                }
                let (s_count, w_count) = (s_counts[gi], j - k);
                if s_count != w_count && !(s_count >= 3 && s_count > w_count) {
                    ok = false;
                    break;
                }
                gi += 1;
                k = j;
            }
            // The walk must end in lockstep with s's spine.
            if ok && gi == s_letters.len() {
                count += 1;
            }
        }
        count
    }
}
