impl Solution {
    pub fn finish_time(n: i32, edges: Vec<Vec<i32>>, base_time: Vec<i32>) -> i64 {
        let n = n as usize;
        let mut children = vec![Vec::new(); n];
        for edge in edges {
            children[edge[0] as usize].push(edge[1] as usize);
        }
        let mut finish = vec![0i64; n];
        for node in (0..n).rev() {
            if children[node].is_empty() {
                finish[node] = base_time[node] as i64;
                continue;
            }
            let mut earliest = i64::MAX;
            let mut latest = i64::MIN;
            for &child in &children[node] {
                earliest = earliest.min(finish[child]);
                latest = latest.max(finish[child]);
            }
            let own_duration = latest - earliest + base_time[node] as i64;
            finish[node] = latest + own_duration;
        }
        finish[0]
    }
}
