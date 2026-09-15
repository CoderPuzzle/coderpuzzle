impl Solution {
    pub fn shortest_superstring(words: Vec<String>) -> String {
        let k = words.len();
        let mut overlap = vec![vec![0usize; k]; k];
        for i in 0..k {
            for j in 0..k {
                if i == j {
                    continue;
                }
                let wi = words[i].as_bytes();
                let wj = words[j].as_bytes();
                let mut best = 0usize;
                let limit = wi.len().min(wj.len());
                for size in 1..=limit {
                    if wi[wi.len() - size..] == wj[..size] {
                        best = size;
                    }
                }
                overlap[i][j] = best;
            }
        }

        let seq_less = |x: &Vec<usize>, y: &Vec<usize>| -> bool {
            for q in 0..x.len() {
                if x[q] != y[q] {
                    return x[q] < y[q];
                }
            }
            false
        };

        let total = 1usize << k;
        let mut dp_len = vec![vec![-1i64; k]; total];
        let mut dp_str: Vec<Vec<Option<String>>> = vec![vec![None; k]; total];
        let mut dp_seq: Vec<Vec<Vec<usize>>> = vec![vec![Vec::new(); k]; total];
        for i in 0..k {
            dp_len[1 << i][i] = words[i].len() as i64;
            dp_str[1 << i][i] = Some(words[i].clone());
            dp_seq[1 << i][i] = vec![i];
        }

        for mask in 0..total {
            for j in 0..k {
                let cur_str = match &dp_str[mask][j] {
                    Some(s) => s.clone(),
                    None => continue,
                };
                let cur_len = dp_len[mask][j];
                let cur_seq = dp_seq[mask][j].clone();
                for nxt in 0..k {
                    if (mask >> nxt) & 1 == 1 {
                        continue;
                    }
                    let cand_len = cur_len + words[nxt].len() as i64 - overlap[j][nxt] as i64;
                    let mut cand_str = cur_str.clone();
                    cand_str.push_str(&words[nxt][overlap[j][nxt]..]);
                    let mut cand_seq = cur_seq.clone();
                    cand_seq.push(nxt);
                    let new_mask = mask | (1usize << nxt);
                    let replace = match &dp_str[new_mask][nxt] {
                        None => true,
                        Some(_) => {
                            cand_len < dp_len[new_mask][nxt]
                                || (cand_len == dp_len[new_mask][nxt] && seq_less(&cand_seq, &dp_seq[new_mask][nxt]))
                        }
                    };
                    if replace {
                        dp_len[new_mask][nxt] = cand_len;
                        dp_str[new_mask][nxt] = Some(cand_str);
                        dp_seq[new_mask][nxt] = cand_seq;
                    }
                }
            }
        }

        let full = total - 1;
        let mut best_j: Option<usize> = None;
        for j in 0..k {
            if dp_str[full][j].is_none() {
                continue;
            }
            let better = match best_j {
                None => true,
                Some(b) => {
                    dp_len[full][j] < dp_len[full][b]
                        || (dp_len[full][j] == dp_len[full][b] && seq_less(&dp_seq[full][j], &dp_seq[full][b]))
                }
            };
            if better {
                best_j = Some(j);
            }
        }
        dp_str[full][best_j.unwrap()].clone().unwrap()
    }
}
