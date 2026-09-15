impl Solution {
    pub fn count_servers(n: i32, mut logs: Vec<Vec<i32>>, x: i32, queries: Vec<i32>) -> Vec<i32> {
        // In the time-sorted logs each query's hits form a contiguous run
        // (times in [q - x, q]). Answering queries in increasing order lets
        // one window serve them all; sorting indices keeps answers in place.
        logs.sort_by_key(|log| log[1]);
        let mut order: Vec<usize> = (0..queries.len()).collect();
        order.sort_by_key(|&i| queries[i]);
        let mut cnt = vec![0i32; n as usize + 1];
        let mut arr = vec![0i32; queries.len()];
        let (mut distinct, mut lo, mut hi) = (0usize, 0usize, 0usize);
        for idx in order {
            let top = queries[idx];
            let bottom = top - x;
            // <= admits a log at exactly q; strict < keeps q - x inside,
            // so both interval edges stay inclusive.
            while hi < logs.len() && logs[hi][1] <= top {
                let s = logs[hi][0] as usize;
                cnt[s] += 1;
                if cnt[s] == 1 {
                    distinct += 1;
                }
                hi += 1;
            }
            while lo < hi && logs[lo][1] < bottom {
                let s = logs[lo][0] as usize;
                cnt[s] -= 1;
                if cnt[s] == 0 {
                    distinct -= 1;
                }
                lo += 1;
            }
            arr[idx] = n - distinct as i32;
        }
        arr
    }
}
