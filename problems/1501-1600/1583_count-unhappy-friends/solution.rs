impl Solution {
    pub fn unhappy_friends(n: i32, preferences: Vec<Vec<i32>>, pairs: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        // rank[i][j] = how highly friend i ranks friend j (lower = more preferred).
        let mut rank = vec![vec![0usize; n]; n];
        for i in 0..n {
            for (position, &friend) in preferences[i].iter().enumerate() {
                rank[i][friend as usize] = position;
            }
        }

        let mut partner = vec![0usize; n];
        for pair in &pairs {
            let x = pair[0] as usize;
            let y = pair[1] as usize;
            partner[x] = y;
            partner[y] = x;
        }

        let mut unhappy = 0;
        for x in 0..n {
            let y = partner[x];
            for u in 0..n {
                if u == x || u == y {
                    continue;
                }
                let v = partner[u];
                if rank[x][u] < rank[x][y] && rank[u][x] < rank[u][v] {
                    unhappy += 1;
                    break;
                }
            }
        }
        unhappy as i32
    }
}
