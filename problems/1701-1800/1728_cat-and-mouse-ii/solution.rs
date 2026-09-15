use std::collections::VecDeque;

impl Solution {
    pub fn can_mouse_win(grid: Vec<String>, cat_jump: i32, mouse_jump: i32) -> bool {
        // Nothing about a position matters except the two cells and whose
        // turn it is — at most 64*64*2 = 8192 states, so label every state
        // outright: mouse on food is a Mouse win; cat on food or on the
        // mouse is a Cat win. Then work backward with degree counting — a
        // state whose mover can jump into a state already won by that mover
        // inherits the win, and any other labeled successor retires one of
        // its moves, so a state whose last move dies is the opponent's.
        // States never labeled are draws the mouse survives forever without
        // eating, which the 1000-turn rule awards to Cat. Per-cell jump
        // lists (slide up to the limit, stop before the first wall, staying
        // counts) drive both the labeling and its reverse edges.
        let rows = grid.len();
        let cols = grid[0].len();
        let mut idx = vec![usize::MAX; rows * cols];
        let mut n = 0;
        let (mut mouse0, mut cat0, mut food) = (0, 0, 0);
        for r in 0..rows {
            for c in 0..cols {
                let ch = grid[r].as_bytes()[c];
                if ch != b'#' {
                    idx[r * cols + c] = n;
                    n += 1;
                    if ch == b'M' {
                        mouse0 = n - 1;
                    } else if ch == b'C' {
                        cat0 = n - 1;
                    } else if ch == b'F' {
                        food = n - 1;
                    }
                }
            }
        }
        let mouse_moves = Self::jump_lists(&grid, rows, cols, &idx, n, mouse_jump as usize);
        let cat_moves = Self::jump_lists(&grid, rows, cols, &idx, n, cat_jump as usize);
        let mouse_back = Self::reversed(&mouse_moves, n);
        let cat_back = Self::reversed(&cat_moves, n);
        let (unknown, mouse, cat) = (0u8, 1u8, 2u8);
        let mut label = vec![unknown; 2 * n * n];
        let mut degree = vec![0usize; 2 * n * n];
        let mut queue: VecDeque<usize> = VecDeque::new();
        for m in 0..n {
            for c in 0..n {
                for t in 0..2 {
                    let s = (m * n + c) * 2 + t;
                    degree[s] = if t == 0 {
                        mouse_moves[m].len()
                    } else {
                        cat_moves[c].len()
                    };
                    if c == food || m == c {
                        label[s] = cat;
                        queue.push_back(s);
                    } else if m == food {
                        label[s] = mouse;
                        queue.push_back(s);
                    }
                }
            }
        }
        while let Some(s) = queue.pop_front() {
            let t = s % 2;
            let base = s / 2;
            let (m, c) = (base / n, base % n);
            let win = label[s];
            if t == 1 {
                for &m2 in &mouse_back[m] {
                    // predecessors: the mouse just moved
                    let p = (m2 * n + c) * 2;
                    if label[p] == unknown {
                        if win == mouse {
                            label[p] = mouse;
                            queue.push_back(p);
                        } else {
                            degree[p] -= 1;
                            if degree[p] == 0 {
                                label[p] = cat;
                                queue.push_back(p);
                            }
                        }
                    }
                }
            } else {
                for &c2 in &cat_back[c] {
                    // predecessors: the cat just moved
                    let p = (m * n + c2) * 2 + 1;
                    if label[p] == unknown {
                        if win == cat {
                            label[p] = cat;
                            queue.push_back(p);
                        } else {
                            degree[p] -= 1;
                            if degree[p] == 0 {
                                label[p] = mouse;
                                queue.push_back(p);
                            }
                        }
                    }
                }
            }
        }
        label[(mouse0 * n + cat0) * 2] == mouse
    }

    fn jump_lists(grid: &[String], rows: usize, cols: usize, idx: &[usize], n: usize, jump: usize) -> Vec<Vec<usize>> {
        let dirs: [(isize, isize); 4] = [(0, 1), (0, -1), (1, 0), (-1, 0)];
        let mut out = vec![Vec::new(); n];
        for r in 0..rows {
            for c in 0..cols {
                let i = idx[r * cols + c];
                if i == usize::MAX {
                    continue;
                }
                out[i].push(i); // staying in place is a move too
                for &(dr, dc) in &dirs {
                    for s in 1..=jump {
                        let rr = r as isize + dr * s as isize;
                        let cc = c as isize + dc * s as isize;
                        if rr < 0 || cc < 0 || rr >= rows as isize || cc >= cols as isize {
                            break;
                        }
                        let (rr, cc) = (rr as usize, cc as usize);
                        if grid[rr].as_bytes()[cc] == b'#' {
                            break;
                        }
                        out[i].push(idx[rr * cols + cc]);
                    }
                }
            }
        }
        out
    }

    fn reversed(moves: &[Vec<usize>], n: usize) -> Vec<Vec<usize>> {
        let mut back = vec![Vec::new(); n];
        for i in 0..n {
            for &j in &moves[i] {
                back[j].push(i);
            }
        }
        back
    }
}
