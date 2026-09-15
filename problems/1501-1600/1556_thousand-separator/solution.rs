impl Solution {
    pub fn thousand_separator(n: i32) -> String {
        // Reverse the digit string, cut it into runs of three, join with
        // '.', then reverse back — the chunk boundaries land exactly on
        // multiples of three counted from the units digit.
        let digits: Vec<u8> = n.to_string().bytes().rev().collect();
        let groups: Vec<String> = digits
            .chunks(3)
            .map(|chunk| String::from_utf8(chunk.to_vec()).unwrap())
            .collect();
        groups.join(".").chars().rev().collect()
    }
}
