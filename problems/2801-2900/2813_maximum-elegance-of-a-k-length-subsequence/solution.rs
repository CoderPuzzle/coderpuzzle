use std::collections::HashMap;

impl Solution {
    pub fn find_maximum_elegance(items: Vec<Vec<i32>>, k: i32) -> i64 {
        let k = k as usize;
        // sort descending lexicographically (profit, then category)
        let mut sorted: Vec<(i64, i64)> = items.iter().map(|it| (it[0] as i64, it[1] as i64)).collect();
        sorted.sort_by(|a, b| b.cmp(a));

        let mut total: i64 = 0;
        let mut counts: HashMap<i64, i64> = HashMap::new();
        for i in 0..k {
            total += sorted[i].0;
            *counts.entry(sorted[i].1).or_insert(0) += 1;
        }
        let mut distinct: i64 = counts.len() as i64;
        let mut ans: i64 = total + distinct * distinct;

        // min-heap of (profit, category) for duplicated categories among top-k;
        // the heap is never pushed to after construction, so a sorted list with
        // a moving pointer reproduces the pop order exactly.
        let mut heap: Vec<(i64, i64)> = Vec::new();
        for i in 0..k {
            if counts[&sorted[i].1] > 1 {
                heap.push(sorted[i]);
            }
        }
        heap.sort();
        let mut h = 0usize;

        for i in k..sorted.len() {
            let (p, c) = sorted[i];
            if counts.contains_key(&c) {
                continue;
            }
            while h < heap.len() && counts[&heap[h].1] <= 1 {
                h += 1;
            }
            if h >= heap.len() {
                break;
            }
            let (min_p, min_c) = heap[h];
            h += 1;
            total = total - min_p + p;
            *counts.get_mut(&min_c).unwrap() -= 1;
            counts.insert(c, 1);
            distinct += 1;
            let cand = total + distinct * distinct;
            if cand > ans {
                ans = cand;
            }
        }
        ans
    }
}
