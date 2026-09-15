use std::collections::HashSet;

impl Solution {
    pub fn robot_sim(commands: Vec<i32>, obstacles: Vec<Vec<i32>>) -> i32 {
        // Replay the walk exactly as stated: the heading is an index on the
        // four cardinal directions, a turn is one step around that cycle
        // (right +1, left +3, mod 4), and a forward command is unit moves
        // that halt the whole command the moment the next cell is blocked.
        // Obstacles live in a set for constant-time membership, and the
        // answer is the largest x*x + y*y over the whole path in time, not
        // just at the final cell.
        let blocked: HashSet<(i32, i32)> = obstacles.iter().map(|cell| (cell[0], cell[1])).collect();
        let dx = [0, 1, 0, -1]; // north, east, south, west
        let dy = [1, 0, -1, 0];
        let (mut x, mut y, mut heading) = (0i32, 0i32, 0usize);
        let mut best: i64 = 0;
        for &command in &commands {
            if command == -2 {
                heading = (heading + 3) & 3; // turn left
            } else if command == -1 {
                heading = (heading + 1) & 3; // turn right
            } else {
                for _ in 0..command {
                    let (nx, ny) = (x + dx[heading], y + dy[heading]);
                    if blocked.contains(&(nx, ny)) {
                        break;
                    }
                    x = nx;
                    y = ny;
                    best = best.max(x as i64 * x as i64 + y as i64 * y as i64);
                }
            }
        }
        best as i32
    }
}
