impl Solution {
    pub fn maximum_value_sum(board: Vec<Vec<i32>>) -> i64 {
        let m = board.len();
        // Per row, only the three most valuable cells can ever matter: a
        // rook of an optimal placement sitting outside its row's top three
        // swaps into one of them — the three candidate columns face at most
        // two blocked ones, so some column is free and the swap never
        // lowers the sum.
        let tops: Vec<Vec<(i64, usize)>> = board
            .iter()
            .map(|row| {
                // Answers reach 3 * 10^9, past the 32-bit range, so values
                // widen to i64 before any summing.
                let mut cells: Vec<(i64, usize)> =
                    row.iter().enumerate().map(|(j, &value)| (value as i64, j)).collect();
                cells.sort_by(|a, b| b.0.cmp(&a.0));
                cells.truncate(3);
                cells
            })
            .collect();

        // Row triples with one candidate each, pairwise-distinct columns.
        // Candidates are value-sorted, so combos run in decreasing
        // partial-sum order and a level is abandoned once even its best
        // completion — the other rows' top cells — cannot beat the answer.
        let mut ans = i64::MIN;
        for i in 0..m {
            for j in i + 1..m {
                let j_top = tops[j][0].0;
                for k in j + 1..m {
                    let k_top = tops[k][0].0;
                    for &(va, ca) in &tops[i] {
                        if va + j_top + k_top <= ans {
                            break;
                        }
                        for &(vb, cb) in &tops[j] {
                            if cb == ca {
                                continue;
                            }
                            if va + vb + k_top <= ans {
                                break;
                            }
                            for &(vc, cc) in &tops[k] {
                                if cc == ca || cc == cb {
                                    continue;
                                }
                                ans = ans.max(va + vb + vc);
                                break;
                            }
                        }
                    }
                }
            }
        }
        ans
    }
}
