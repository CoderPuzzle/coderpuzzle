impl Solution {
    pub fn check_two_chessboards(coordinate1: String, coordinate2: String) -> bool {
        // A square's color follows the parity of column index plus row
        // number; character-code offsets are even, so raw codes keep it.
        let b1 = coordinate1.as_bytes();
        let b2 = coordinate2.as_bytes();
        let p1 = (b1[0] + b1[1]) % 2;
        let p2 = (b2[0] + b2[1]) % 2;
        p1 == p2
    }
}
