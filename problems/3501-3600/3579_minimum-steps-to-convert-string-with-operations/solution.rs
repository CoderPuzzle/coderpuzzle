impl Solution {
    pub fn min_operations(word1: String, word2: String) -> i32 {
        // Per part, an index may serve at most one swap, one replace and
        // one reversal, so an optimal schedule permutes first (at most one
        // reversal plus disjoint swaps) and replaces what is left. A swap
        // pays off exactly on a mutual pair (a,b)/(b,a); with type counts
        // cnt[a][b] = #{p: s[p]=a != t[p]=b}, the largest swap matching is
        // sum min(cnt[a][b], cnt[b][a]), and the part costs wrong - pairs,
        // or 1 + wrong' - pairs' when reversed first.
        let w1: Vec<u8> = word1.into_bytes();
        let w2: Vec<u8> = word2.into_bytes();
        let n = w1.len();
        let swap_pairs = |cnt: &[[i32; 26]; 26]| -> i32 {
            let mut total = 0;
            for a in 0..26 {
                for b in (a + 1)..26 {
                    total += cnt[a][b].min(cnt[b][a]);
                }
            }
            total
        };
        let mut cost = vec![vec![0i32; n]; n];
        for i in 0..n {
            for j in i..n {
                let mut cnt = [[0i32; 26]; 26];
                let mut cnt_rev = [[0i32; 26]; 26];
                let (mut wrong, mut wrong_rev) = (0, 0);
                for p in i..=j {
                    let a = (w1[p] - b'a') as usize;
                    let b = (w2[p] - b'a') as usize;
                    if a != b {
                        wrong += 1;
                        cnt[a][b] += 1;
                    }
                    let a_rev = (w1[j - (p - i)] - b'a') as usize;
                    if a_rev != b {
                        wrong_rev += 1;
                        cnt_rev[a_rev][b] += 1;
                    }
                }
                let direct = wrong - swap_pairs(&cnt);
                let reversed = 1 + wrong_rev - swap_pairs(&cnt_rev);
                cost[i][j] = direct.min(reversed);
            }
        }
        // Partition DP over prefix lengths; costs add across parts.
        const INF: i32 = 1 << 30;
        let mut best = vec![INF; n + 1];
        best[0] = 0;
        for end in 1..=n {
            for start in 0..end {
                best[end] = best[end].min(best[start] + cost[start][end - 1]);
            }
        }
        best[n]
    }
}
