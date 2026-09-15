use std::collections::HashSet;

impl Solution {
    pub fn num_special_equiv_groups(words: Vec<String>) -> i32 {
        // Swaps never mix parities: even-indexed letters only trade with
        // even-indexed ones, odd with odd, so a word is exactly its two
        // sorted halves. The set counts distinct (even, odd) signatures.
        let mut seen: HashSet<String> = HashSet::new();
        for word in &words {
            let mut even: Vec<char> = word.chars().step_by(2).collect();
            let mut odd: Vec<char> = word.chars().skip(1).step_by(2).collect();
            even.sort_unstable();
            odd.sort_unstable();
            let mut signature: String = even.into_iter().collect();
            signature.push('#');
            signature.extend(odd);
            seen.insert(signature);
        }
        seen.len() as i32
    }
}
