impl Solution {
    pub fn count_distinct(s: String) -> i32 {
        // Suffix automaton: each state v other than the root owns exactly the
        // len[v] - len[link[v]] substrings in its endpos equivalence class,
        // and every distinct substring belongs to exactly one class, so the
        // answer is the sum of those class sizes. Clones created while
        // splitting a transition are ordinary states and count the same way.
        let s = s.as_bytes();
        let n = s.len();
        let states = 2 * n;
        let mut length = vec![0i32; states];
        let mut link = vec![-1i32; states];
        // 0 doubles as "no transition": no edge ever points at the root; the
        // root's -1 link is carried as None in the Option walks below.
        let mut trans = vec![[0usize; 26]; states];
        let mut size = 1usize;
        let mut last = 0usize;
        for &ch in s {
            let c = (ch - b'a') as usize;
            let cur = size;
            size += 1;
            length[cur] = length[last] + 1;
            let mut p = Some(last);
            while p.map_or(false, |px| trans[px][c] == 0) {
                let px = p.unwrap();
                trans[px][c] = cur;
                p = if link[px] < 0 { None } else { Some(link[px] as usize) };
            }
            match p {
                None => link[cur] = 0,
                Some(px) => {
                    let q = trans[px][c];
                    if length[px] + 1 == length[q] {
                        link[cur] = q as i32;
                    } else {
                        // q is too deep to be cur's suffix link: copy it as a
                        // shallower clone, redirect the family's transitions,
                        // then hang both q and cur under the clone.
                        let clone = size;
                        size += 1;
                        length[clone] = length[px] + 1;
                        link[clone] = link[q];
                        trans[clone] = trans[q];
                        let mut p = Some(px);
                        while p.map_or(false, |py| trans[py][c] == q) {
                            let py = p.unwrap();
                            trans[py][c] = clone;
                            p = if link[py] < 0 { None } else { Some(link[py] as usize) };
                        }
                        link[q] = clone as i32;
                        link[cur] = clone as i32;
                    }
                }
            }
            last = cur;
        }
        let mut answer = 0i32;
        for v in 1..size {
            answer += length[v] - length[link[v] as usize];
        }
        answer
    }
}
