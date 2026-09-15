impl Solution {
    pub fn maximum_importance(n: i32, roads: Vec<Vec<i32>>) -> i64 {
        // Degrees in 64-bit: rank * degree reaches ~2.5e9, past INT32_MAX.
        let n = n as usize;
        let mut degrees = vec![0i64; n];
        for road in &roads {
            degrees[road[0] as usize] += 1;
            degrees[road[1] as usize] += 1;
        }
        degrees.sort();
        let mut total: i64 = 0;
        for (rank, degree) in degrees.iter().enumerate() {
            total += (rank as i64 + 1) * degree;
        }
        total
    }
}
