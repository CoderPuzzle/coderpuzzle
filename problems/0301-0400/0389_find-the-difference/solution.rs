impl Solution {
    // Every letter of s reappears somewhere in t, so folding both
    // strings into one XOR accumulator cancels each shuffled pair
    // and leaves only the added letter's code. The statement promises
    // lowercase letters, so bytes() enumerates exactly the characters.
    pub fn find_the_difference(s: String, t: String) -> String {
        let mut code = 0u8;
        for byte in s.bytes() {
            code ^= byte;
        }
        for byte in t.bytes() {
            code ^= byte;
        }
        (code as char).to_string()
    }
}
