use std::collections::{HashSet, VecDeque};

impl Solution {
    pub fn sliding_puzzle(board: Vec<Vec<i32>>) -> i32 {
        const TARGET: [u8; 6] = [1, 2, 3, 4, 5, 0];
        // Adjacency of each row-major cell on the 2x3 board (MAX = none),
        // so the expansion needs no bounds logic.
        const NEIGHBORS: [[usize; 3]; 6] = [
            [1, 3, usize::MAX],
            [0, 2, 4],
            [1, 5, usize::MAX],
            [0, 4, usize::MAX],
            [3, 5, 1],
            [2, 4, usize::MAX],
        ];
        // Boards are nodes, slides of the 0 are edges: BFS gives the
        // minimum move count over at most 6! = 720 states, encoded as
        // row-major tuples so they hash into a visited set.
        let start: Vec<u8> = board.iter().flatten().map(|&v| v as u8).collect();
        if start == TARGET {
            return 0;
        }
        let mut visited: HashSet<Vec<u8>> = HashSet::new();
        visited.insert(start.clone());
        let mut queue: VecDeque<(Vec<u8>, i32)> = VecDeque::new();
        queue.push_back((start, 0));
        while let Some((state, moves)) = queue.pop_front() {
            let zero = state.iter().position(|&v| v == 0).unwrap();
            for &nxt in NEIGHBORS[zero].iter() {
                if nxt == usize::MAX {
                    continue;
                }
                // Swap the 0 with a neighboring tile to make a successor.
                let mut new_state = state.clone();
                new_state.swap(zero, nxt);
                if new_state == TARGET {
                    return moves + 1;
                }
                // insert() reports novelty, so each state expands once.
                if visited.insert(new_state.clone()) {
                    queue.push_back((new_state, moves + 1));
                }
            }
        }
        // Queue exhausted: the target sits in the unreachable half of the
        // permutations (odd parity).
        -1
    }
}
