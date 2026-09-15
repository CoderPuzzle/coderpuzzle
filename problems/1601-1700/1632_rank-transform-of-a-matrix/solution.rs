use std::collections::HashMap;

impl Solution {
    pub fn matrix_rank_transform(matrix: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let m = matrix.len();
        let n = matrix[0].len();
        // cells sorted by (value, r, c); idx = r * n + c encodes (r, c) order.
        let mut cells: Vec<usize> = (0..m * n).collect();
        cells.sort_by(|&a, &b| {
            let va = matrix[a / n][a % n];
            let vb = matrix[b / n][b % n];
            if va != vb {
                va.cmp(&vb)
            } else {
                a.cmp(&b)
            }
        });

        // Largest rank used so far in each row/column, from smaller values
        // (processing is in increasing value order, so those are final).
        let mut row_max = vec![0i32; m];
        let mut col_max = vec![0i32; n];
        let mut ans = vec![vec![0i32; n]; m];

        let mut parent: Vec<usize> = vec![0usize; m * n];
        fn find(parent: &mut Vec<usize>, mut x: usize) -> usize {
            while parent[x] != x {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            x
        }
        fn union(parent: &mut Vec<usize>, a: usize, b: usize) {
            let ra = find(parent, a);
            let rb = find(parent, b);
            if ra != rb {
                parent[rb] = ra;
            }
        }

        let count = cells.len();
        let mut i = 0usize;
        while i < count {
            let value = matrix[cells[i] / n][cells[i] % n];
            let mut group: Vec<usize> = Vec::new();
            let mut j = i;
            while j < count && matrix[cells[j] / n][cells[j] % n] == value {
                group.push(cells[j]);
                j += 1;
            }

            // Fresh union-find per group, so components never leak across
            // different values. Equal values sharing a row or column are
            // forced to the same rank; unions chain through shared
            // rows/columns.
            for &idx in &group {
                parent[idx] = idx;
            }
            let mut by_row: HashMap<usize, usize> = HashMap::new();
            for &idx in &group {
                let r = idx / n;
                match by_row.get(&r) {
                    Some(&prev) => union(&mut parent, idx, prev),
                    None => {
                        by_row.insert(r, idx);
                    }
                }
            }
            let mut by_col: HashMap<usize, usize> = HashMap::new();
            for &idx in &group {
                let c = idx % n;
                match by_col.get(&c) {
                    Some(&prev) => union(&mut parent, idx, prev),
                    None => {
                        by_col.insert(c, idx);
                    }
                }
            }

            // Component rank = 1 + the strictest requirement over its cells;
            // that is simultaneously the smallest legal rank for all of them.
            let mut comp_rank: HashMap<usize, i32> = HashMap::new();
            for &idx in &group {
                let r = idx / n;
                let c = idx % n;
                let root = find(&mut parent, idx);
                let candidate = row_max[r].max(col_max[c]) + 1;
                let cur = comp_rank.get(&root).cloned();
                if cur.is_none() || candidate > cur.unwrap() {
                    comp_rank.insert(root, candidate);
                }
            }

            // Assign the shared rank and refresh the row/column maxima so
            // later, larger values see it.
            for &idx in &group {
                let r = idx / n;
                let c = idx % n;
                let rank = *comp_rank.get(&find(&mut parent, idx)).unwrap();
                ans[r][c] = rank;
                if rank > row_max[r] {
                    row_max[r] = rank;
                }
                if rank > col_max[c] {
                    col_max[c] = rank;
                }
            }

            i = j;
        }

        ans
    }
}
