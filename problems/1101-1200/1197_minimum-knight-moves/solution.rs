use std::collections::VecDeque;

impl Solution {
    pub fn min_knight_moves(x: i32, y: i32) -> i32 {
        // Mirror symmetry folds every target into the first quadrant; a
        // knight never needs to leave the window two squares past it. The
        // search runs in offset coordinates: board (nx, ny) is stored as
        // (nx + 2, ny + 2), so every index is nonnegative.
        let (tx, ty) = (x.abs(), y.abs());
        const MOVES: [(i32, i32); 8] = [(1, 2), (2, 1), (2, -1), (1, -2), (-1, -2), (-2, -1), (-2, 1), (-1, 2)];
        let width = (tx + 5) as usize;
        let height = (ty + 5) as usize;
        let mut seen = vec![false; width * height];
        let mut queue: VecDeque<(usize, usize)> = VecDeque::new();
        seen[(2 * height + 2) as usize] = true;
        queue.push_back((2, 2));
        let target = (((tx + 2) * (height as i32)) + ty + 2) as usize;
        let mut steps = 0;
        while !queue.is_empty() {
            for _ in 0..queue.len() {
                let (cx, cy) = queue.pop_front().unwrap();
                if cx * height + cy == target {
                    return steps;
                }
                for (dx, dy) in MOVES {
                    let nx = cx as i32 + dx;
                    let ny = cy as i32 + dy;
                    if 0 <= nx && nx < width as i32 && 0 <= ny && ny < height as i32 {
                        let flat = (nx * (height as i32) + ny) as usize;
                        if !seen[flat] {
                            seen[flat] = true;
                            queue.push_back((nx as usize, ny as usize));
                        }
                    }
                }
            }
            steps += 1;
        }
        unreachable!()
    }
}
