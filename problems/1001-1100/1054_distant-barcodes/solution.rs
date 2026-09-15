use std::collections::HashMap;

impl Solution {
    pub fn rearrange_barcodes(barcodes: Vec<i32>) -> Vec<i32> {
        let n = barcodes.len();
        let mut counts: HashMap<i32, i32> = HashMap::new();
        for &b in &barcodes {
            *counts.entry(b).or_insert(0) += 1;
        }

        let mut order: Vec<i32> = counts.keys().copied().collect();
        order.sort_by(|a, c| {
            let freq_a = counts[a];
            let freq_c = counts[c];
            if freq_a != freq_c {
                freq_c.cmp(&freq_a)
            } else {
                a.cmp(c)
            }
        });

        let mut result = vec![0; n];
        let mut pos = 0usize;
        for value in order {
            let count = counts[&value];
            for _ in 0..count {
                if pos >= n {
                    pos = 1;
                }
                result[pos] = value;
                pos += 2;
            }
        }

        result
    }
}
