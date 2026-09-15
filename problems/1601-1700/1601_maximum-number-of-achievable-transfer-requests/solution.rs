impl Solution {
    pub fn maximum_requests(n: i32, requests: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        let m = requests.len();
        let mut best: u32 = 0;
        for mask in 0u32..(1u32 << m) {
            let popcount = mask.count_ones();
            if popcount <= best {
                continue;
            }
            let mut degree = vec![0i32; n];
            for i in 0..m {
                if mask & (1 << i) != 0 {
                    let from = requests[i][0] as usize;
                    let to = requests[i][1] as usize;
                    degree[from] -= 1;
                    degree[to] += 1;
                }
            }
            if degree.iter().all(|&d| d == 0) {
                best = popcount;
            }
        }
        best as i32
    }
}
