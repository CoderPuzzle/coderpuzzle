use std::collections::HashMap;

impl Solution {
    // State: ranks i, j of the two stars in a row of m survivors.
    pub fn earliest_and_latest(n: i32, first_player: i32, second_player: i32) -> Vec<i32> {
        fn dp(i: usize, j: usize, m: usize, memo: &mut HashMap<(usize, usize, usize), (u32, u32)>) -> (u32, u32) {
            if i + j == m + 1 {
                return (1, 1);
            }
            if i > m - j + 1 {
                return dp(m - j + 1, m - i + 1, m, memo);
            }
            if let Some(&v) = memo.get(&(i, j, m)) {
                return v;
            }
            let half = (m + 1) / 2;
            let mut free: Vec<(usize, usize)> = Vec::new();
            for k in 1..=half {
                let back = m + 1 - k;
                if k < back && i != k && i != back && j != k && j != back {
                    free.push((k, back));
                }
            }
            let mut lo = u32::MAX;
            let mut hi = 0u32;
            for mask in 0..1u32 << free.len() {
                let mut survivors: Vec<usize> = Vec::new();
                for k in 1..=half {
                    let back = m + 1 - k;
                    if k == back {
                        survivors.push(k);
                    } else if i == k || i == back {
                        survivors.push(i);
                    } else if j == k || j == back {
                        survivors.push(j);
                    } else {
                        let idx = free.iter().position(|&p| p == (k, back)).unwrap();
                        survivors.push(if mask >> idx & 1 == 1 { k } else { back });
                    }
                }
                survivors.sort_unstable();
                let nf = survivors.iter().position(|&p| p == i).unwrap() + 1;
                let ns = survivors.iter().position(|&p| p == j).unwrap() + 1;
                let (sl, sh) = dp(nf, ns, survivors.len(), memo);
                lo = lo.min(sl);
                hi = hi.max(sh);
            }
            let res = (lo + 1, hi + 1);
            memo.insert((i, j, m), res);
            res
        }
        let mut memo = HashMap::new();
        let (e, l) = dp(first_player as usize, second_player as usize, n as usize, &mut memo);
        vec![e as i32, l as i32]
    }
}
