use std::collections::VecDeque;

impl Solution {
    pub fn min_integer(num: String, k: i32) -> String {
        let bytes = num.as_bytes();
        let n = bytes.len();
        let mut k = k;
        // Fenwick tree over 1..=n; tree[p] = 1 means the digit originally at
        // position p is still unplaced. Prefix sums answer "how many
        // unplaced digits sit before position p" in O(log n).
        let mut tree = vec![0i32; n + 1];
        let update = |tree: &mut Vec<i32>, mut i: usize, delta: i32| {
            while i <= n {
                tree[i] += delta;
                i += i & i.wrapping_neg();
            }
        };
        let query = |tree: &Vec<i32>, mut i: usize| -> i32 {
            let mut total = 0;
            while i > 0 {
                total += tree[i];
                i -= i & i.wrapping_neg();
            }
            total
        };
        for i in 1..=n {
            update(&mut tree, i, 1);
        }

        // Per-digit queues of remaining original (1-indexed) positions, in
        // increasing order, so the front is always the cheapest to reach.
        let mut positions: Vec<VecDeque<usize>> = vec![VecDeque::new(); 10];
        for (i, &b) in bytes.iter().enumerate() {
            positions[(b - b'0') as usize].push_back(i + 1);
        }

        let mut result = Vec::with_capacity(n);
        for _ in 0..n {
            for d in 0..10 {
                let p = match positions[d].front() {
                    Some(&p) => p,
                    None => continue,
                };
                // Cost to bring this digit to the front of the unplaced
                // suffix: one swap per still-active digit before it.
                let cost = query(&tree, p - 1);
                if cost <= k {
                    positions[d].pop_front();
                    update(&mut tree, p, -1);
                    k -= cost;
                    result.push(b'0' + d as u8);
                    break;
                }
            }
        }
        String::from_utf8(result).unwrap()
    }
}
