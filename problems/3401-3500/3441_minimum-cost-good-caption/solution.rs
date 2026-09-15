impl Solution {
    // Suffix DP over run states plus a greedy walk. A[i][c] is the cheapest
    // completion of the remaining positions given a closed run (length >= 3)
    // of character c; a fresh run planted at i consumes i, i+1, i+2 and
    // re-enters the closed state at i+3, so switching away from c costs the
    // best "triple(i, ch) + A[i+3][ch]" over ch != c — kept as a top-2 pair
    // so excluding c itself stays O(1). The walk takes the smallest
    // character whose branch keeps the remaining budget achievable.
    pub fn min_cost_good_caption(caption: String) -> String {
        let n = caption.len();
        if n < 3 {
            return String::new();
        }
        const INF: i32 = 1 << 30;
        let src: Vec<i32> = caption.bytes().map(|b| (b - b'a') as i32).collect();
        let mut a = vec![INF; 26 * (n + 4)];
        for c in 0..26 {
            a[26 * n + c] = 0;
        }
        let mut m1 = vec![INF; n];
        let mut m2 = vec![INF; n];
        let mut j1 = vec![-1i32; n];
        let mut j2 = vec![-1i32; n];
        for i in (0..n).rev() {
            let si = src[i];
            let row_next = 26 * (i + 1);
            let mut best1 = INF;
            let mut best2 = INF;
            let mut idx1: i32 = -1;
            let mut idx2: i32 = -1;
            if i + 3 <= n {
                let s1 = src[i + 1];
                let s2 = src[i + 2];
                let row_triple = 26 * (i + 3);
                for ch in 0..26i32 {
                    let v = (si - ch).abs() + (s1 - ch).abs() + (s2 - ch).abs() + a[row_triple + ch as usize];
                    if v < best1 {
                        best2 = best1;
                        idx2 = idx1;
                        best1 = v;
                        idx1 = ch;
                    } else if v < best2 {
                        best2 = v;
                        idx2 = ch;
                    }
                }
                m1[i] = best1;
                j1[i] = idx1;
                m2[i] = best2;
                j2[i] = idx2;
            }
            let row = 26 * i;
            for c in 0..26usize {
                let extend = (si - c as i32).abs() + a[row_next + c];
                let switch_away = if idx1 < 0 {
                    INF
                } else if idx1 != c as i32 {
                    best1
                } else {
                    best2
                };
                a[row + c] = extend.min(switch_away);
            }
        }
        let mut budget = m1[0];
        let mut out = String::with_capacity(n);
        let mut r = 0; // trailing run length; 0 only before the first char
        let mut c: i32 = -1;
        for i in 0..n {
            let si = src[i];
            let chosen: i32;
            let cand: i32;
            if r == 1 {
                // a length-1 run must still reach length 3: needs i, i+1
                cand = if i + 2 <= n {
                    (si - c).abs() + (src[i + 1] - c).abs() + a[26 * (i + 2) + c as usize]
                } else {
                    INF
                };
                chosen = c;
            } else if r == 2 {
                cand = (si - c).abs() + a[26 * (i + 1) + c as usize];
                chosen = c;
            } else {
                // free choice: extend the closed run, or plant a fresh one
                let ext = if r == 3 {
                    (si - c).abs() + a[26 * (i + 1) + c as usize]
                } else {
                    INF
                };
                let mut pick: i32 = 27;
                let mut pick_val = INF;
                if m1[i] == budget && j1[i] != c {
                    pick = j1[i];
                    pick_val = m1[i];
                } else if m2[i] == budget && j2[i] != c {
                    pick = j2[i];
                    pick_val = m2[i];
                }
                if ext == budget && c < pick {
                    pick = c;
                    pick_val = ext;
                }
                chosen = pick;
                cand = pick_val;
            }
            // unreachable: every reachable state keeps a branch on budget
            if cand != budget {
                return String::new();
            }
            out.push((b'a' + chosen as u8) as char);
            budget -= (si - chosen).abs();
            if r == 0 || (r == 3 && chosen != c) {
                r = 1;
                c = chosen;
            } else if r < 3 {
                r += 1;
            }
        }
        out
    }
}
