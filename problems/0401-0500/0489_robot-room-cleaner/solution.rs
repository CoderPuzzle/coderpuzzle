use std::collections::HashSet;

impl Solution {
    pub fn cleanRoom(sweeper: &mut Robot) {
        let dirs: [(i32, i32); 4] = [(-1, 0), (0, 1), (1, 0), (0, -1)]; // up, right, down, left
        let mut visited: HashSet<(i32, i32)> = HashSet::new();
        visited.insert((0, 0));
        sweeper.clean();
        // Iterative spiral DFS (a 100 x 200 grid overflows recursive DFS):
        // a frame is [row, col, entry direction, next relative direction].
        // Invariant: iteration i of the top frame starts with the sweeper
        // facing (entry + i) % 4, and every iteration ends with exactly one
        // turn_right — either directly (blocked ahead) or deferred, arriving
        // from the child via the back-out sequence below.
        let mut stack: Vec<[i32; 4]> = vec![[0, 0, 0, 0]];
        while !stack.is_empty() {
            let frame = *stack.last().unwrap();
            let (row, col, entry, index) = (frame[0], frame[1], frame[2], frame[3]);
            if index == 4 {
                stack.pop();
                if !stack.is_empty() {
                    // Back out of the child: about-face, retrace the step,
                    // about-face, then the parent's trailing turn_right into
                    // its next direction.
                    sweeper.turn_right();
                    sweeper.turn_right();
                    sweeper.r#move();
                    sweeper.turn_right();
                    sweeper.turn_right();
                    sweeper.turn_right();
                }
                continue;
            }
            let face = (entry + index) % 4;
            let next = (row + dirs[face as usize].0, col + dirs[face as usize].1);
            if !visited.contains(&next) && sweeper.r#move() {
                visited.insert(next);
                sweeper.clean();
                let top = stack.len() - 1;
                stack[top][3] = index + 1;
                stack.push([next.0, next.1, face, 0]);
            } else {
                sweeper.turn_right();
                let top = stack.len() - 1;
                stack[top][3] = index + 1;
            }
        }
    }
}
