impl Solution {
    pub fn valid_strings(n: i32) -> Vec<String> {
        // A valid string never contains "00", so the choice at each position
        // depends only on the previous character: after a 0 the next char is
        // forced to be 1, after a 1 either character may follow. Appending 0
        // right after a 0 is the only move that can ever go wrong, so pruning
        // exactly that branch keeps every surviving path valid. Trying 0
        // before 1 makes the depth-first walk emit the strings already in
        // ascending lexicographic order — no final sort needed.
        let mut current = String::new();
        let mut results = Vec::new();
        Self::backtrack(n, &mut current, &mut results);
        results
    }

    fn backtrack(n: i32, current: &mut String, results: &mut Vec<String>) {
        if current.len() == n as usize {
            results.push(current.clone());
            return;
        }
        for ch in ['0', '1'] {
            if ch == '0' && current.ends_with('0') {
                continue; // would create "00" — prune this branch
            }
            current.push(ch);
            Self::backtrack(n, current, results);
            current.pop();
        }
    }
}
