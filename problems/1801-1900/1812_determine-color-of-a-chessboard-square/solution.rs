// A square is white exactly when its file and rank have opposite
// parities: a1 is black (1 + 1 is even), and every step along a file or
// a rank flips the color, so the color is the parity of file + rank --
// odd sums are white, even sums are black. Both characters are read
// straight from the coordinate, and nothing exceeds 16, so every
// language runs exact small integers.
impl Solution {
    pub fn square_is_white(coordinates: String) -> bool {
        let bytes = coordinates.as_bytes();
        let file = (bytes[0] - b'a') as i32 + 1;
        let rank = (bytes[1] - b'0') as i32;
        (file + rank) % 2 == 1
    }
}
