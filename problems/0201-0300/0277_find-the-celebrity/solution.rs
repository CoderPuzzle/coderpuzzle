impl Solution {
    pub fn find_celebrity(graph: Vec<Vec<i32>>) -> i32 {
        let n = graph.len();
        // Elimination pass: a candidate that knows nobody else.
        let mut candidate = 0usize;
        for i in 1..n {
            if graph[candidate][i] == 1 {
                candidate = i;
            }
        }
        // Verification pass.
        for i in 0..n {
            if i == candidate {
                continue;
            }
            if graph[candidate][i] == 1 {
                return -1; // candidate knows someone
            }
            if graph[i][candidate] == 0 {
                return -1; // someone does not know the candidate
            }
        }
        candidate as i32
    }
}
