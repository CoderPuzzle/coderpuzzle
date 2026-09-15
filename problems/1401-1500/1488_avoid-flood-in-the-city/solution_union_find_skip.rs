use std::collections::HashMap;

impl Solution {
    pub fn avoid_flood(rains: Vec<i64>) -> Vec<i64> {
        fn find(nxt: &mut Vec<usize>, x: usize) -> usize {
            let mut root = x;
            while nxt[root] != root {
                root = nxt[root];
            }
            let mut cur = x;
            while nxt[cur] != root {
                let step = nxt[cur];
                nxt[cur] = root;
                cur = step;
            }
            root
        }
        let n = rains.len();
        let mut nxt: Vec<usize> = (0..n + 2).collect();
        let mut last: HashMap<i64, usize> = HashMap::new();
        let mut ans = vec![-1i64; n];
        for i in 0..n {
            let r = rains[i];
            if r == 0 {
                ans[i] = 1;
            } else {
                nxt[i] = i + 1;
                if let Some(&prev) = last.get(&r) {
                    let j = find(&mut nxt, prev + 1);
                    if j >= i {
                        return Vec::new();
                    }
                    ans[j] = r;
                    nxt[j] = j + 1;
                }
                last.insert(r, i);
            }
        }
        ans
    }
}
