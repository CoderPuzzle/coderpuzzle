impl Solution {
    pub fn max_score(n: i32, edges: Vec<Vec<i32>>) -> i64 {
        // Connected with every degree <= 2, the graph is one path
        // (m == n - 1) or one cycle (m == n). Pendulum the values 1..n —
        // 1, 3, 5, ... then ..., 6, 4, 2 — so the largest values sit side
        // by side. Scores reach ~n^3/6 ≈ 2e13, so i64, not i32.
        let n = n as usize;
        let mut seq = Vec::with_capacity(n);
        let mut v = 1usize;
        while v <= n {
            seq.push(v);
            v += 2;
        }
        let mut v = if n % 2 == 0 { n } else { n - 1 };
        while v >= 2 {
            seq.push(v);
            v -= 2;
        }
        let mut score = 0i64;
        for i in 0..n - 1 {
            score += seq[i] as i64 * seq[i + 1] as i64;
        }
        if edges.len() == n {
            score += seq[0] as i64 * seq[n - 1] as i64;
        }
        score
    }
}
