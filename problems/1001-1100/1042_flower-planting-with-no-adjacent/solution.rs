impl Solution {
    pub fn garden_no_adj(n: i32, paths: Vec<Vec<i32>>) -> Vec<i32> {
        let n = n as usize;
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n + 1];
        for path in &paths {
            let x = path[0] as usize;
            let y = path[1] as usize;
            adj[x].push(y);
            adj[y].push(x);
        }

        let mut color = vec![0i32; n + 1];
        for i in 1..=n {
            let mut used = [false; 5];
            for &neighbor in &adj[i] {
                if color[neighbor] != 0 {
                    used[color[neighbor] as usize] = true;
                }
            }
            for c in 1..=4 {
                if !used[c] {
                    color[i] = c as i32;
                    break;
                }
            }
        }

        color[1..=n].to_vec()
    }
}
