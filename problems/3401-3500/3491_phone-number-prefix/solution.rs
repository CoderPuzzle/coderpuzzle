impl Solution {
    // In sorted order a prefix relationship must surface between
    // neighbors: the shorter prefix sorts first, and anything landing
    // between them shares that prefix as well.
    pub fn phone_prefix(mut numbers: Vec<String>) -> bool {
        numbers.sort();
        for w in numbers.windows(2) {
            if w[1].starts_with(&w[0]) {
                return false;
            }
        }
        true
    }
}
