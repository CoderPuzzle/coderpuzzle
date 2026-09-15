impl Solution {
    pub fn cat_mouse_game(graph: Vec<Vec<i32>>) -> i32 {
        // The game is a three-valued minimax over positions (mouse node, cat
        // node, whose turn) — at most 2n*n of them, and a repeated position
        // ends the game as a draw, so every position is played at most once
        // and the game is finite. Evaluate positions backward from the
        // terminals: the mouse at the hole is a mouse win, the cat on the
        // mouse a cat win. A position whose mover reaches any marked
        // successor carrying its own win takes that mark immediately; once
        // its last undecided successor falls, every move leads to the
        // opponent's win and the position takes the opponent's mark. The
        // cat's moves skip the hole. Whatever stays unmarked at the fixpoint
        // is a draw — a player that cannot force a win keeps play cycling
        // until a position repeats. The queue is iterative, and the answer
        // is the mark of the initial position (mouse at 1, cat at 2, mouse
        // to move).
        let n = graph.len();
        // value[state]: 0 undecided/draw, 1 mouse win, 2 cat win; a state
        // encodes (mouse, cat, turn), turn 0 = mouse to move, 1 = cat to
        // move.
        let states = n * n * 2;
        let mut value = vec![0i32; states];
        let mut moves = vec![0i32; states];
        for mouse in 0..n {
            for cat in 1..n {
                moves[(mouse * n + cat) * 2] = graph[mouse].len() as i32;
                let mut cat_moves = 0;
                for &node in &graph[cat] {
                    if node != 0 {
                        cat_moves += 1;
                    }
                }
                moves[(mouse * n + cat) * 2 + 1] = cat_moves;
            }
        }
        let mut queue: Vec<usize> = Vec::with_capacity(states);
        for cat in 1..n {
            for turn in 0..2 {
                value[cat * 2 + turn] = 1;
                queue.push(cat * 2 + turn);
            }
        }
        for mouse in 1..n {
            for turn in 0..2 {
                value[(mouse * n + mouse) * 2 + turn] = 2;
                queue.push((mouse * n + mouse) * 2 + turn);
            }
        }
        let mut head = 0;
        while head < queue.len() {
            let state = queue[head];
            head += 1;
            let turn = state % 2;
            let cat = (state / 2) % n;
            let mouse = state / (2 * n);
            let mark = value[state];
            if turn == 1 {
                // predecessors: mouse-to-move positions stepping onto `mouse`
                for &node in &graph[mouse] {
                    let previous = (node as usize * n + cat) * 2;
                    if value[previous] != 0 {
                        continue;
                    }
                    if mark == 1 {
                        // the mouse (the mover) wins
                        value[previous] = 1;
                        queue.push(previous);
                    } else {
                        moves[previous] -= 1;
                        if moves[previous] == 0 {
                            value[previous] = 2;
                            queue.push(previous);
                        }
                    }
                }
            } else if cat != 0 {
                // no cat move can ever reach the hole
                for &node in &graph[cat] {
                    let previous = (mouse * n + node as usize) * 2 + 1;
                    if value[previous] != 0 {
                        continue;
                    }
                    if mark == 2 {
                        // the cat (the mover) wins
                        value[previous] = 2;
                        queue.push(previous);
                    } else {
                        moves[previous] -= 1;
                        if moves[previous] == 0 {
                            value[previous] = 1;
                            queue.push(previous);
                        }
                    }
                }
            }
        }
        value[(1 * n + 2) * 2]
    }
}
