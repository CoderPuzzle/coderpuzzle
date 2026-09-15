impl Solution {
    // Both rules only shuffle zeros: "10" -> "01" slides a zero one seat
    // left, and "00" -> "10" fuses an adjacent pair into their right seat.
    // Herding all z zeros into the first one (index first) parks the
    // survivor at first + z - 1 with '1' everywhere else; with at most
    // one zero no move can improve the string.
    pub fn maximum_binary_string(binary: String) -> String {
        let zeros = binary.bytes().filter(|&c| c == b'0').count();
        if zeros <= 1 {
            return binary;
        }
        let seat = binary.find('0').unwrap() + zeros - 1;
        let mut out = vec![b'1'; binary.len()];
        out[seat] = b'0';
        String::from_utf8(out).unwrap()
    }
}
