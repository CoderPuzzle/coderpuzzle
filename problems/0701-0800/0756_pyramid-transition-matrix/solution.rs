use std::collections::HashSet;

impl Solution {
    pub fn pyramid_transition(bottom: String, allowed: Vec<String>) -> bool {
        // For each ordered pair of letters, a bitmask of the letters that
        // may sit on it. A pair with no pattern is a dead end: mask 0.
        let mut tops = [0u32; 26 * 26];
        for t in &allowed {
            let b = t.as_bytes();
            tops[usize::from(b[0] - b'A') * 26 + usize::from(b[1] - b'A')] |= 1 << (b[2] - b'A');
        }
        let mut width = bottom.len();
        let mut rows: HashSet<Vec<u8>> = HashSet::new();
        rows.insert(bottom.into_bytes());
        while width > 1 {
            let mut above: HashSet<Vec<u8>> = HashSet::new();
            for row in &rows {
                // Candidate letters per position of the row above; a zero
                // mask means this row cannot carry anything.
                let mut masks = Vec::with_capacity(width - 1);
                let mut alive = true;
                for i in 0..width - 1 {
                    let mask = tops[usize::from(row[i] - b'A') * 26 + usize::from(row[i + 1] - b'A')];
                    if mask == 0 {
                        alive = false;
                        break;
                    }
                    masks.push(mask);
                }
                if !alive {
                    continue;
                }
                // The state stays a whole concrete row: adjacent positions
                // above share the row below, so the letter at one position
                // constrains its neighbor. Enumerate the product of the
                // masks; the set dedups rows lifted from different parents.
                let mut frontier: Vec<Vec<u8>> = vec![Vec::new()];
                for mask in masks {
                    let mut lifted = Vec::with_capacity(frontier.len() * 6);
                    for r in &frontier {
                        for d in 0u32..6 {
                            if mask >> d & 1 == 1 {
                                let mut extended = r.clone();
                                extended.push(b'A' + d as u8);
                                lifted.push(extended);
                            }
                        }
                    }
                    frontier = lifted;
                }
                above.extend(frontier);
            }
            if above.is_empty() {
                return false;
            }
            rows = above;
            width -= 1;
        }
        true
    }
}
