use std::collections::BinaryHeap;

impl Solution {
    pub fn max_total_value(nums: Vec<i32>, k: i32) -> i64 {
        let n = nums.len();
        // Sparse tables: level j holds the max/min of every window of
        // length 2^j, each derived from the previous level in one pass.
        let levels = (usize::BITS - n.leading_zeros()) as usize;
        let mut max_table: Vec<Vec<i32>> = Vec::with_capacity(levels);
        let mut min_table: Vec<Vec<i32>> = Vec::with_capacity(levels);
        max_table.push(nums.clone());
        min_table.push(nums);
        for j in 1..levels {
            let half = 1usize << (j - 1);
            let len = n - (1usize << j) + 1;
            let (prev_max, prev_min) = (&max_table[j - 1], &min_table[j - 1]);
            max_table.push((0..len).map(|i| prev_max[i].max(prev_max[i + half])).collect());
            min_table.push((0..len).map(|i| prev_min[i].min(prev_min[i + half])).collect());
        }
        let mut logs = vec![0u32; n + 1];
        for i in 2..=n {
            logs[i] = logs[i >> 1] + 1;
        }
        // Two overlapping power-of-two windows cover [l, r].
        let spread = |l: usize, r: usize| -> i64 {
            let j = logs[r - l + 1] as usize;
            let low = 1usize << j;
            (max_table[j][l].max(max_table[j][r - low + 1]) - min_table[j][l].min(min_table[j][r - low + 1])) as i64
        };
        // Row l is non-increasing as r shrinks toward l, so the heap merges
        // n sorted rows and always holds each row's largest unseen entry.
        let mut heap = BinaryHeap::new();
        for l in 0..n {
            heap.push((spread(l, n - 1), l, n - 1));
        }
        let mut total: i64 = 0;
        for _ in 0..k {
            let (value, l, r) = heap.pop().unwrap();
            total += value;
            if r > l {
                heap.push((spread(l, r - 1), l, r - 1));
            }
        }
        total
    }
}
