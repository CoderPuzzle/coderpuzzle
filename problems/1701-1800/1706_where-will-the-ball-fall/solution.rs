// Each column's ball walks alone: the board d under it deflects it into the
// gap between columns c and c + d, and it drops through only if the board on
// the far side of that gap points the same way — a facing pair forms a V that
// closes the gap, a missing neighbour means the gap opens into a wall, and
// both mean stuck.
impl Solution {
    pub fn find_ball(grid: Vec<Vec<i32>>) -> Vec<i32> {
        let m = grid.len();
        let n = grid[0].len();
        let mut answer = Vec::with_capacity(n);
        for ball in 0..n {
            let mut c = ball as i32;
            for r in 0..m {
                let d = grid[r][c as usize];
                let next = c + d;
                if next < 0 || next >= n as i32 || grid[r][next as usize] != d {
                    c = -1;
                    break;
                }
                c = next;
            }
            answer.push(c);
        }
        answer
    }
}
