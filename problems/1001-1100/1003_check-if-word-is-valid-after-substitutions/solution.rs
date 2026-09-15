impl Solution {
    pub fn is_valid(s: String) -> bool {
        // Every insertion of "abc" is reversible: removing an "abc"
        // substring from a valid string leaves another valid string, all
        // the way back to "". A stack turns that reversal into one pass —
        // whenever the top three entries read a, b, c, they are the most
        // recently completed insertion, so popping all three undoes it.
        let mut stack: Vec<u8> = Vec::with_capacity(s.len());
        for character in s.bytes() {
            stack.push(character);
            let top = stack.len();
            if top >= 3 && stack[top - 3] == b'a' && stack[top - 2] == b'b' && stack[top - 1] == b'c' {
                stack.truncate(top - 3);
            }
        }
        // s was reachable by the operation iff nothing is left over.
        stack.is_empty()
    }
}
