impl Solution {
    // A password is priced by three counts: how many of the three character
    // classes are missing, how many replaces the runs of length >= 3 need,
    // and — over length 20 — where the mandatory deletions help most.
    pub fn strong_password_checker(password: String) -> i32 {
        let chars: Vec<char> = password.chars().collect();
        let n = chars.len() as i32;
        let has_lower = chars.iter().any(|c| c.is_ascii_lowercase());
        let has_upper = chars.iter().any(|c| c.is_ascii_uppercase());
        let has_digit = chars.iter().any(|c| c.is_ascii_digit());
        let missing = 3 - (has_lower as i32 + has_upper as i32 + has_digit as i32);
        // Every maximal run of length >= 3, e.g. "aaabbb" -> [3, 3].
        let mut runs: Vec<usize> = Vec::new();
        let mut i = 0;
        while i < chars.len() {
            let mut j = i;
            while j < chars.len() && chars[j] == chars[i] {
                j += 1;
            }
            if j - i >= 3 {
                runs.push(j - i);
            }
            i = j;
        }
        // Too short: the inserts that reach length 6 can also break the one
        // possible run and carry the missing classes.
        if chars.len() < 6 {
            return (6 - n).max(missing);
        }
        // A replace fixes a run slot and can double as a class fix, so the
        // mid regime is a max, not a sum.
        let mut replace: i32 = runs.iter().map(|length| (*length / 3) as i32).sum();
        if chars.len() <= 20 {
            return missing.max(replace);
        }
        // Too long: n - 20 deletions are unavoidable. A deletion retires a
        // replace only when it pushes a run below a multiple of 3, so the
        // budget goes to runs sitting on a multiple first (1 deletion),
        // then remainder 1 (2 deletions), then remainder 2 (3 deletions).
        let mut delete = n - 20;
        for remainder in 0..3usize {
            for length in &runs {
                if length % 3 != remainder {
                    continue;
                }
                let cost = remainder as i32 + 1;
                if delete >= cost {
                    delete -= cost;
                    replace -= 1;
                }
            }
        }
        replace = (replace - delete / 3).max(0);
        (n - 20) + missing.max(replace)
    }
}
