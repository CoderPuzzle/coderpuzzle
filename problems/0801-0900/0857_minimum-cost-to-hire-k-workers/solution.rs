impl Solution {
    pub fn mincost_to_hire_workers(quality: Vec<i32>, wage: Vec<i32>, k: i32) -> f64 {
        let mut workers: Vec<(i32, i32)> = wage.iter().zip(quality.iter()).map(|(&w, &q)| (w, q)).collect();
        workers.sort_by(|a, b| {
            (a.0 as f64 / a.1 as f64)
                .partial_cmp(&(b.0 as f64 / b.1 as f64))
                .unwrap()
        });

        let k = k as usize;
        let mut heap = std::collections::BinaryHeap::new();
        let mut total_quality: i64 = 0;
        let mut best = f64::INFINITY;
        for &(w, q) in &workers {
            heap.push(q);
            total_quality += q as i64;
            if heap.len() > k {
                total_quality -= heap.pop().unwrap() as i64;
            }
            if heap.len() == k {
                let cost = total_quality as f64 * (w as f64 / q as f64);
                if cost < best {
                    best = cost;
                }
            }
        }
        best
    }
}
