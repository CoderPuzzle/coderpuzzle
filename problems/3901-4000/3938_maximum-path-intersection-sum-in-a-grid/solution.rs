impl Solution {
    pub fn max_score(g: Vec<Vec<i32>>) -> i32 {
        let mut ans = i32::MIN;
        for a in &g {
            let mut e = a[0];
            for &x in &a[1..] {
                let z = e + x;
                ans = ans.max(z);
                e = x.max(z);
            }
        }
        for j in 0..g[0].len() {
            let mut e = g[0][j];
            for i in 1..g.len() {
                let z = e + g[i][j];
                ans = ans.max(z);
                e = g[i][j].max(z);
            }
        }
        for i in 1..g.len() - 1 {
            for j in 1..g[0].len() - 1 {
                ans = ans.max(g[i][j]);
            }
        }
        ans
    }
}
