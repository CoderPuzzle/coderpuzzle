impl Solution {
    pub fn alphabet_board_path(target: String) -> String {
        let mut out = String::new();
        let (mut row, mut col) = (0i32, 0i32);
        for ch in target.chars() {
            let index = ch as i32 - 'a' as i32;
            // U then L then D then R: horizontal runs never happen inside
            // the truncated row 5, because L precedes the descent to 'z'
            // and U climbs away from 'z' before any R.
            let nrow = index / 5;
            let ncol = index % 5;
            for _ in 0..(row - nrow).max(0) {
                out.push('U');
            }
            for _ in 0..(col - ncol).max(0) {
                out.push('L');
            }
            for _ in 0..(nrow - row).max(0) {
                out.push('D');
            }
            for _ in 0..(ncol - col).max(0) {
                out.push('R');
            }
            out.push('!');
            row = nrow;
            col = ncol;
        }
        out
    }
}
