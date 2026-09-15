use std::collections::HashMap;

impl Solution {
    pub fn minimum_cost(
        source: String,
        target: String,
        original: Vec<String>,
        changed: Vec<String>,
        cost: Vec<i32>,
    ) -> i64 {
        // Give every distinct conversion string an id and run Floyd-Warshall
        // on the minimum operation cost between any two of them; repeated
        // operations on one window then collapse to a shortest path.
        let mut ids: HashMap<&str, usize> = HashMap::new();
        for s in original.iter().chain(changed.iter()) {
            if !ids.contains_key(s.as_str()) {
                let id = ids.len();
                ids.insert(s.as_str(), id);
            }
        }
        let m = ids.len();
        const INF: i64 = 1_i64 << 50;
        let mut dist = vec![vec![INF; m]; m];
        for i in 0..m {
            dist[i][i] = 0;
        }
        for i in 0..cost.len() {
            let x = ids[original[i].as_str()];
            let y = ids[changed[i].as_str()];
            dist[x][y] = dist[x][y].min(cost[i] as i64);
        }
        for k in 0..m {
            for i in 0..m {
                if dist[i][k] >= INF {
                    continue;
                }
                for j in 0..m {
                    dist[i][j] = dist[i][j].min(dist[i][k] + dist[k][j]);
                }
            }
        }

        // A trie over the distinct strings lets one lockstep walk over
        // source/target from each position find every usable segment length.
        let mut trie: Vec<[i32; 26]> = vec![[-1; 26]];
        let mut id_at: Vec<i32> = vec![-1];
        let mut keys: Vec<&&str> = ids.keys().collect();
        keys.sort();
        for &s in keys {
            let mut cur = 0usize;
            for b in s.bytes().map(|c| (c - b'a') as usize) {
                if trie[cur][b] < 0 {
                    trie[cur][b] = trie.len() as i32;
                    trie.push([-1; 26]);
                    id_at.push(-1);
                }
                cur = trie[cur][b] as usize;
            }
            id_at[cur] = ids[s] as i32;
        }

        let n = source.len();
        let sb = source.as_bytes();
        let tb = target.as_bytes();
        let mut dp = vec![INF; n + 1];
        dp[0] = 0;
        for j in 0..n {
            if dp[j] >= INF {
                continue;
            }
            if sb[j] == tb[j] && dp[j] < dp[j + 1] {
                dp[j + 1] = dp[j];
            }
            let mut sn = 0i32;
            let mut tn = 0i32;
            for k in j..n {
                sn = trie[sn as usize][(sb[k] - b'a') as usize];
                tn = trie[tn as usize][(tb[k] - b'a') as usize];
                if sn < 0 || tn < 0 {
                    break;
                }
                let x = id_at[sn as usize];
                let y = id_at[tn as usize];
                if x >= 0 && y >= 0 {
                    let (x, y) = (x as usize, y as usize);
                    if dist[x][y] < INF && dp[j] + dist[x][y] < dp[k + 1] {
                        dp[k + 1] = dp[j] + dist[x][y];
                    }
                }
            }
        }
        if dp[n] >= INF {
            -1
        } else {
            dp[n]
        }
    }
}
