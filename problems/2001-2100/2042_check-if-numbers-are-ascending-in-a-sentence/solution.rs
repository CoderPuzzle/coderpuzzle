impl Solution {
    pub fn are_numbers_ascending(s: String) -> bool {
        let mut previous = 0;

        for token in s.split_whitespace() {
            if token.as_bytes()[0].is_ascii_digit() {
                let current = token.parse::<i32>().unwrap();
                if current <= previous {
                    return false;
                }
                previous = current;
            }
        }

        true
    }
}
