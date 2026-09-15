use std::collections::HashMap;

impl Solution {
    pub fn count_pairs(n: i32, edges: Vec<Vec<i32>>, queries: Vec<i32>) -> Vec<i32> {
        // Degrees count every parallel edge separately, so for a pair (a, b)
        // the degree sum counts an edge shared by both endpoints twice:
        // incident(a, b) = deg[a] + deg[b] - mult(a, b).
        let n = n as usize;
        let mut deg = vec![0i32; n + 1];
        let mut mult: HashMap<(usize, usize), i32> = HashMap::new();
        for e in &edges {
            let (mut u, mut v) = (e[0] as usize, e[1] as usize);
            deg[u] += 1;
            deg[v] += 1;
            if u > v {
                std::mem::swap(&mut u, &mut v);
            }
            *mult.entry((u, v)).or_insert(0) += 1;
        }
        let mut d = deg[1..].to_vec();
        d.sort_unstable();
        // For each pair joined by at least one edge, s is the degree sum and
        // t the true incident count. A query k overcounts exactly the pairs
        // with t <= k < s, so the fix adds #{s <= k} - #{t <= k}.
        let mut s_vals: Vec<i32> = Vec::with_capacity(mult.len());
        let mut t_vals: Vec<i32> = Vec::with_capacity(mult.len());
        for (&(u, v), &m) in &mult {
            let s = deg[u] + deg[v];
            s_vals.push(s);
            t_vals.push(s - m);
        }
        s_vals.sort_unstable();
        t_vals.sort_unstable();
        let upper = |a: &[i32], k: i32| a.partition_point(|&x| x <= k);
        let mut answer = Vec::with_capacity(queries.len());
        for &k in &queries {
            // Two pointers over the sorted degrees count every unordered
            // pair whose degree sum is strictly above k.
            let (mut lo, mut hi, mut total) = (0usize, n - 1, 0i32);
            while lo < hi {
                if d[lo] + d[hi] > k {
                    total += (hi - lo) as i32;
                    hi -= 1;
                } else {
                    lo += 1;
                }
            }
            total += (upper(&s_vals, k) - upper(&t_vals, k)) as i32;
            answer.push(total);
        }
        answer
    }
}
