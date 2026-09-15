use std::collections::HashMap;

impl Solution {
    pub fn is_scramble(s1: String, s2: String) -> bool {
        // Memoized recursion over string pairs. Two guards run before any
        // split work: identical strings are trivially scrambles, and a pair
        // whose letter counts differ can never be one, since swapping blocks
        // of a string only rearranges its letters.
        let mut memo = HashMap::new();
        solve(&mut memo, &s1, &s2)
    }
}

// A scramble never adds or removes a letter, so a count mismatch rules the
// pair out before any split is tried.
fn same_letters(a: &str, b: &str) -> bool {
    let mut counts = [0i32; 26];
    for &byte in a.as_bytes() {
        counts[(byte - b'a') as usize] += 1;
    }
    for &byte in b.as_bytes() {
        counts[(byte - b'a') as usize] -= 1;
    }
    counts == [0; 26]
}

// The pair (a, b) keys the memo.
fn solve(memo: &mut HashMap<(String, String), bool>, a: &str, b: &str) -> bool {
    if a == b {
        return true;
    }
    if !same_letters(a, b) {
        return false;
    }
    let key = (a.to_string(), b.to_string());
    if let Some(answer) = memo.get(&key) {
        return *answer;
    }
    let n = a.len();
    for i in 1..n {
        // Keep the halves in order: the split of b sits at the same index
        // as the split of a.
        if solve(memo, &a[..i], &b[..i]) && solve(memo, &a[i..], &b[i..]) {
            memo.insert(key, true);
            return true;
        }
        // Swap the halves: the head of a pairs with the tail of b.
        if solve(memo, &a[..i], &b[n - i..]) && solve(memo, &a[i..], &b[..n - i]) {
            memo.insert(key, true);
            return true;
        }
    }
    memo.insert(key, false);
    false
}
