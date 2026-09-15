impl Solution {
    pub fn max_weight(weights: Vec<i32>, w1: i32, w2: i32) -> i32 {
        fn shift_left(row: &[u64], s: usize) -> Vec<u64> {
            let (whole, rem) = (s / 64, s % 64);
            let len = row.len();
            let mut out = vec![0; len];
            for k in (0..len).rev() {
                let mut value = if k >= whole { row[k - whole] } else { 0 };
                value <<= rem;
                if rem > 0 && k > whole {
                    value |= row[k - whole - 1] >> (64 - rem);
                }
                out[k] = value;
            }
            out
        }

        let w1 = w1 as usize;
        let w2 = w2 as usize;
        let words = w2 / 64 + 1;
        // Trim the top word to its live bits so a shift cannot carry
        // phantom capacity past the bag's limit.
        let mut low_mask = vec![u64::MAX; words];
        let tail = (w2 % 64) as u32;
        if tail != 63 {
            low_mask[words - 1] = (1u64 << (tail + 1)) - 1;
        }
        // Row a is one wide integer whose bit j marks state (a, j) as
        // reachable: bag 1 filled to exactly a, bag 2 to exactly j.
        let mut rows: Vec<Vec<u64>> = vec![vec![0; words]; w1 + 1];
        rows[0][0] = 1;
        for w in weights {
            let w = w as usize;
            // Bag-2 placements shift a whole row left, trimmed to the legal
            // occupancies. Stage them before the bag-1 pass below touches
            // rows, so both moves read the previous item's states only.
            let mut shifted: Vec<Vec<u64>> = (0..=w1).map(|a| shift_left(&rows[a], w)).collect();
            for row in &mut shifted {
                for k in 0..words {
                    row[k] &= low_mask[k];
                }
            }
            // Bag-1 placements OR row a - w into row a, walked downward so
            // the merge reads pre-item rows and no item is spent twice.
            for a in (w..=w1).rev() {
                for k in 0..words {
                    rows[a][k] |= rows[a - w][k];
                }
            }
            for a in 0..=w1 {
                for k in 0..words {
                    rows[a][k] |= shifted[a][k];
                }
            }
        }
        let mut best = 0usize;
        for a in 0..=w1 {
            if let Some(top) = rows[a].iter().rposition(|&word| word != 0) {
                // Fixed a: the best partner is the highest reachable bit.
                let high = 63 - rows[a][top].leading_zeros();
                best = best.max(a + top * 64 + high as usize);
            }
        }
        best as i32
    }
}
