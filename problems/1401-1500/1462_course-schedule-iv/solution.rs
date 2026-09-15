impl Solution {
    pub fn check_if_prerequisite(num_courses: i32, prerequisites: Vec<Vec<i32>>, queries: Vec<Vec<i32>>) -> Vec<bool> {
        let n = num_courses as usize;
        let mut adjacency: Vec<Vec<usize>> = vec![Vec::new(); n];
        let mut indegree = vec![0usize; n];
        for pair in &prerequisites {
            let (a, b) = (pair[0] as usize, pair[1] as usize);
            adjacency[a].push(b);
            indegree[b] += 1;
        }
        let words = (n + 63) / 64;
        // reach[v] is a bitset of the courses that reach course v
        let mut reach = vec![vec![0u64; words]; n];
        let mut queue: Vec<usize> = (0..n).filter(|&i| indegree[i] == 0).collect();
        let mut head = 0;
        while head < queue.len() {
            let u = queue[head];
            head += 1;
            for &v in &adjacency[u] {
                reach[v][u >> 6] |= 1u64 << (u & 63);
                for w in 0..words {
                    reach[v][w] |= reach[u][w];
                }
                indegree[v] -= 1;
                if indegree[v] == 0 {
                    queue.push(v);
                }
            }
        }
        queries
            .iter()
            .map(|query| {
                let (u, v) = (query[0] as usize, query[1] as usize);
                reach[v][u >> 6] & (1u64 << (u & 63)) != 0
            })
            .collect()
    }
}
