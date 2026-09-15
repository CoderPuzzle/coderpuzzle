use std::collections::HashSet;

impl Solution {
    pub fn num_squares(n: i32) -> i32 {
        // The squares available as subtractions, ascending — so the inner
        // loop can break as soon as s exceeds the remainder.
        let mut squares: Vec<i32> = Vec::new();
        let mut i = 1;
        while i * i <= n {
            squares.push(i * i);
            i += 1;
        }
        // Level-by-level BFS over remainders: level k holds every value
        // reachable from n by subtracting exactly k squares.
        let mut level: HashSet<i32> = HashSet::new();
        level.insert(n);
        let mut seen: HashSet<i32> = HashSet::new();
        seen.insert(n);
        let mut steps = 0;
        while !level.is_empty() {
            steps += 1;
            let mut next: HashSet<i32> = HashSet::new();
            for &r in &level {
                for &s in &squares {
                    if s > r {
                        break;
                    }
                    let t = r - s;
                    // Reaching 0 at this depth settles the answer.
                    if t == 0 {
                        return steps;
                    }
                    // First sight of a remainder is its shallowest depth; a
                    // revisit through another square can never beat it.
                    if seen.insert(t) {
                        next.insert(t);
                    }
                }
            }
            level = next;
        }
        // Lagrange's four-square theorem bounds the search at four levels,
        // so the loop always returns from inside.
        steps
    }
}
