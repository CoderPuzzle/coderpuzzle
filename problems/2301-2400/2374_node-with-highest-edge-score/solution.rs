impl Solution {
    // Node edges[i] gains i to its score, so one accumulation pass fills
    // every score; a second pass picks the highest with the smallest index
    // (strict > keeps the earlier node on ties). Scores reach ~n^2/2 = 5e9,
    // so accumulate in 64 bits.
    pub fn edge_score(edges: Vec<i32>) -> i32 {
        let mut scores = vec![0i64; edges.len()];
        for (source, target) in edges.iter().enumerate() {
            scores[*target as usize] += source as i64;
        }
        let mut best_node = 0usize;
        for node in 1..scores.len() {
            if scores[node] > scores[best_node] {
                best_node = node;
            }
        }
        best_node as i32
    }
}
