impl Solution {
    pub fn generate_palindromes(s: String) -> Vec<String> {
        let mut counts = [0usize; 26];
        for &letter in s.as_bytes() {
            counts[(letter - b'a') as usize] += 1;
        }
        // A palindrome pairs up every letter except at most one middle
        // occupant, so a second odd count means no palindromic arrangement.
        let mut middle = String::new();
        for (index, &count) in counts.iter().enumerate() {
            if count % 2 == 1 {
                if !middle.is_empty() {
                    return Vec::new();
                }
                middle.push((b'a' + index as u8) as char);
            }
        }
        // Quota for the left half, one bucket per distinct letter. Choosing
        // buckets rather than positions makes every half distinct by
        // construction — the duplicate branches a naive per-position
        // permutation would explore never arise.
        let mut half: Vec<usize> = counts.iter().map(|&count| count / 2).collect();
        let target = s.len() / 2;
        let mut results = Vec::new();
        let mut current = String::with_capacity(target);
        Self::walk(&mut half, target, &middle, &mut current, &mut results);
        results
    }

    fn walk(half: &mut [usize], target: usize, middle: &str, current: &mut String, results: &mut Vec<String>) {
        // Half complete: mirror it around the odd letter, if there is one.
        if current.len() == target {
            let left = current.clone();
            let right: String = left.chars().rev().collect();
            results.push(format!("{}{}{}", left, middle, right));
            return;
        }
        // Letters ascend, so earlier positions vary slowest and the
        // palindromes come out in ascending lexicographic order.
        for index in 0..26 {
            if half[index] == 0 {
                continue;
            }
            half[index] -= 1;
            current.push((b'a' + index as u8) as char);
            Self::walk(half, target, middle, current, results);
            current.pop();
            half[index] += 1;
        }
    }
}
