impl Solution {
    pub fn lex_smallest_after_deletion(s: String) -> String {
        // A letter occurring once can never be deleted, and any letter can
        // be deleted down to a single occurrence, so the reachable strings
        // are exactly the subsequences that keep every distinct letter.
        // Build the smallest one letter by letter: take the smallest letter
        // whose earliest remaining occurrence still leaves every
        // not-yet-taken letter an occurrence after it.
        let bytes = s.as_bytes();
        let n = bytes.len();
        let mut pos: Vec<Vec<usize>> = vec![Vec::new(); 26];
        for (i, &b) in bytes.iter().enumerate() {
            pos[(b - b'a') as usize].push(i);
        }
        let mut todo: Vec<usize> = (0..26).filter(|&c| !pos[c].is_empty()).collect();
        let mut ptr = [0usize; 26];
        let mut out: Vec<u8> = Vec::with_capacity(n);
        let mut p: isize = -1;
        while !todo.is_empty() {
            // Two smallest last-occurrence deadlines among needed letters.
            let mut m1 = n;
            let mut m2 = n;
            let mut d1 = 26usize;
            for &c in &todo {
                let lc = pos[c][pos[c].len() - 1];
                if lc < m1 {
                    m2 = m1;
                    m1 = lc;
                    d1 = c;
                } else if lc < m2 {
                    m2 = lc;
                }
            }
            for c in 0..26 {
                let lst = &pos[c];
                let mut j = ptr[c];
                while j < lst.len() && (lst[j] as isize) <= p {
                    j += 1;
                }
                ptr[c] = j;
                if j == lst.len() {
                    continue;
                }
                // Taking occurrence q must not strand a needed letter.
                let q = lst[j];
                let lim = if c == d1 { m2 } else { m1 };
                if q < lim {
                    out.push(b'a' + c as u8);
                    p = q as isize;
                    if let Some(k) = todo.iter().position(|&x| x == c) {
                        todo.remove(k);
                    }
                    break;
                }
            }
        }
        String::from_utf8(out).unwrap()
    }
}
