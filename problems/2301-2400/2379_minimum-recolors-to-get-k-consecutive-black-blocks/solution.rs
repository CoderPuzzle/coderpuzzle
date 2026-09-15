impl Solution {
    // The answer is the window of k consecutive blocks containing the
    // fewest whites; a sliding window updates that count in O(1) as it
    // moves.
    pub fn minimum_recolors(blocks: String, k: i32) -> i32 {
        let bytes = blocks.as_bytes();
        let n = bytes.len();
        let k = k as usize;
        let mut whites = bytes[..k].iter().filter(|&&b| b == b'W').count();
        let mut best = whites;
        for right in k..n {
            if bytes[right] == b'W' {
                whites += 1;
            }
            if bytes[right - k] == b'W' {
                whites -= 1;
            }
            best = best.min(whites);
        }
        best as i32
    }
}
