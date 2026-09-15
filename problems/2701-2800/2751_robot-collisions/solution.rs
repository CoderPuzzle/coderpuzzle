use std::collections::HashSet;

impl Solution {
    pub fn survived_robots_healths(positions: Vec<i32>, healths: Vec<i32>, directions: String) -> Vec<i32> {
        let n = positions.len();
        let mut h = healths.clone();
        let dirs = directions.as_bytes();
        let mut order: Vec<usize> = (0..n).collect();
        order.sort_by(|&a, &b| positions[a].cmp(&positions[b]));
        // Sweep left to right; every collision is a right-mover meeting a
        // left-mover face to face, so a stack of sweep survivors is the only
        // state needed. Health changes are written into `h` so survivors
        // keep their decremented values.
        let mut stack: Vec<usize> = Vec::new();
        for &idx in &order {
            if dirs[idx] == b'R' {
                // Right-movers wait on the stack for someone to hit them.
                stack.push(idx);
            } else {
                // A left-mover duels right-movers off the stack top until
                // it dies or the right-movers run out (same-direction robots
                // ahead can never collide with it).
                let mut alive = true;
                while let Some(&top_idx) = stack.last() {
                    if dirs[top_idx] != b'R' {
                        break;
                    }
                    // Weaker top dies; the incoming robot loses 1 health and
                    // fights on. Stronger top survives at -1; equal kills both.
                    if h[top_idx] < h[idx] {
                        h[idx] -= 1;
                        stack.pop();
                    } else if h[top_idx] > h[idx] {
                        h[top_idx] -= 1;
                        alive = false;
                        break;
                    } else {
                        stack.pop();
                        alive = false;
                        break;
                    }
                }
                if alive {
                    stack.push(idx);
                }
            }
        }
        // Survivors are exactly the stack, but reported in input order.
        let survivors: HashSet<usize> = stack.into_iter().collect();
        let mut result = Vec::with_capacity(survivors.len());
        for i in 0..n {
            if survivors.contains(&i) {
                result.push(h[i]);
            }
        }
        result
    }
}
