impl Solution {
    pub fn letter_combinations(digits: String) -> Vec<String> {
        // 2..9 map to consecutive group slots; 1 and 0 have no letters.
        let groups = ["abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
        // Zero digits means zero combinations: [] (not [""]), and the walk
        // below must never start on an empty tree.
        if digits.is_empty() {
            return Vec::new();
        }
        let digits = digits.as_str();
        let mut combinations = Vec::new();
        let mut current = String::with_capacity(digits.len());
        walk(digits, &groups, 0, &mut current, &mut combinations);
        combinations
    }
}

// A leaf is a complete root-to-leaf path: one letter per digit. Visiting
// letters in group order makes earlier digits vary slowest.
fn walk(digits: &str, groups: &[&str; 8], position: usize, current: &mut String, combinations: &mut Vec<String>) {
    if position == digits.len() {
        combinations.push(current.clone());
        return;
    }
    let group = groups[(digits.as_bytes()[position] - b'2') as usize];
    for letter in group.chars() {
        current.push(letter);
        walk(digits, groups, position + 1, current, combinations);
        current.pop();
    }
}
