use std::collections::HashSet;

impl Solution {
    pub fn max_unique_split(s: String) -> i32 {
        let chars: Vec<char> = s.chars().collect();
        let n = chars.len();
        let mut used: HashSet<String> = HashSet::new();
        let mut best = 0;
        walk(&chars, n, 0, 0, &mut used, &mut best);
        best
    }
}

fn walk(chars: &[char], n: usize, start: usize, count: i32, used: &mut HashSet<String>, best: &mut i32) {
    if start == n {
        *best = (*best).max(count);
        return;
    }
    // count so far plus the (n - start) characters still left, each
    // contributing at most one more piece: a bound on what this branch
    // could still reach, cheap to check before it is explored.
    if count + (n - start) as i32 <= *best {
        return;
    }
    for end in (start + 1)..=n {
        let piece: String = chars[start..end].iter().collect();
        if used.contains(&piece) {
            continue;
        }
        used.insert(piece.clone());
        walk(chars, n, end, count + 1, used, best);
        // Undo so the next candidate length starts from the same
        // used-substring state as this one did.
        used.remove(&piece);
    }
}
