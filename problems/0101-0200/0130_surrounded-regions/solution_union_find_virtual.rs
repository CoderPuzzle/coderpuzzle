impl Solution {
    pub fn solve(mut board: Vec<Vec<String>>) -> Vec<Vec<String>> {
        // Path-halving: splice every other node directly under its
        // grandparent, flattening the tree while walking to the root.
        fn find(parent: &mut [usize], mut x: usize) -> usize {
            while parent[x] != x {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            x
        }
        fn union(parent: &mut [usize], a: usize, b: usize) {
            let ra = find(parent, a);
            let rb = find(parent, b);
            if ra != rb {
                parent[ra] = rb;
            }
        }
        // Encode the connectivity instead of walking it: one disjoint-set
        // node per cell plus one virtual node standing for the outside, so
        // a region survives exactly when it lands in the virtual node's set.
        let m = board.len();
        let n = board[0].len();
        let outside = m * n;
        let mut parent: Vec<usize> = (0..=outside).collect();
        for i in 0..m {
            for j in 0..n {
                if board[i][j] != "O" {
                    continue;
                }
                // A border 'O' is an escape route: tying it to the virtual
                // node marks its whole region safe in one stroke.
                if i == 0 || i == m - 1 || j == 0 || j == n - 1 {
                    union(&mut parent, i * n + j, outside);
                }
                // Only the right and lower neighbors are merged, which
                // offers every orthogonal pair to the union exactly once.
                if i + 1 < m && board[i + 1][j] == "O" {
                    union(&mut parent, i * n + j, (i + 1) * n + j);
                }
                if j + 1 < n && board[i][j + 1] == "O" {
                    union(&mut parent, i * n + j, i * n + j + 1);
                }
            }
        }
        // Every merge is done, so the virtual node's root is now fixed and
        // one lookup per cell decides its fate: an 'O' outside that set has
        // no path to the border, which is exactly what enclosed means.
        let border = find(&mut parent, outside);
        for i in 0..m {
            for j in 0..n {
                if board[i][j] == "O" && find(&mut parent, i * n + j) != border {
                    board[i][j] = "X".to_string();
                }
            }
        }
        // Ownership hands over the whole allocation, so the capture
        // rewrote it in place — the same board is what the judge compares.
        board
    }
}
