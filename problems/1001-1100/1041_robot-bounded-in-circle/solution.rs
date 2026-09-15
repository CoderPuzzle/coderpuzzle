impl Solution {
    pub fn is_robot_bounded(instructions: String) -> bool {
        // simulate one pass from the origin facing north; L/R rotate the
        // heading a quarter turn via (dx, dy) -> (-dy, dx) / (dy, -dx)
        let (mut x, mut y) = (0i32, 0i32);
        let (mut dx, mut dy) = (0i32, 1i32); // north
        for ch in instructions.bytes() {
            match ch {
                b'G' => {
                    x += dx;
                    y += dy;
                }
                b'L' => {
                    let ndx = -dy;
                    let ndy = dx;
                    dx = ndx;
                    dy = ndy;
                }
                _ => {
                    // 'R'
                    let ndx = dy;
                    let ndy = -dx;
                    dx = ndx;
                    dy = ndy;
                }
            }
        }
        // at the origin: each pass is a closed loop. Turned at all: every
        // repetition's displacement is the previous one rotated by a fixed
        // quarter turn, so at most four copies cancel back to the start.
        // Facing north while displaced repeats the same drift — the one
        // unbounded case.
        (x == 0 && y == 0) || !(dx == 0 && dy == 1)
    }
}
