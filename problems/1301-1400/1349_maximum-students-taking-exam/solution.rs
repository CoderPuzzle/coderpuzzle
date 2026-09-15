use std::collections::HashMap;

impl Solution {
    pub fn max_students(seats: Vec<Vec<String>>) -> i32 {
        let m = seats.len();
        let n = seats[0].len();

        let mut row_masks: Vec<Vec<u32>> = Vec::with_capacity(m);
        for row in &seats {
            let mut masks: Vec<u32> = Vec::new();
            for mask in 0..(1u32 << n) {
                let mut ok = true;
                for c in 0..n {
                    if (mask >> c) & 1 == 1 {
                        if row[c] == "#" {
                            ok = false;
                            break;
                        }
                        if c > 0 && ((mask >> (c - 1)) & 1 == 1) {
                            ok = false;
                            break;
                        }
                    }
                }
                if ok {
                    masks.push(mask);
                }
            }
            row_masks.push(masks);
        }

        // dp over rows: states maps previous row's mask -> best count so far.
        let mut states: HashMap<u32, i32> = HashMap::new();
        states.insert(0, 0);
        for i in 0..m {
            let mut new_states: HashMap<u32, i32> = HashMap::new();
            for &mask in &row_masks[i] {
                let mut best: i32 = -1;
                for (&prev, &val) in states.iter() {
                    // no student directly above-left or above-right
                    if mask & ((prev << 1) | (prev >> 1)) != 0 {
                        continue;
                    }
                    if val > best {
                        best = val;
                    }
                }
                if best >= 0 {
                    let v = best + (mask.count_ones() as i32);
                    let cur = new_states.get(&mask).cloned();
                    if cur.is_none() || v > cur.unwrap() {
                        new_states.insert(mask, v);
                    }
                }
            }
            states = new_states;
        }
        let mut ans = 0;
        for &val in states.values() {
            if val > ans {
                ans = val;
            }
        }
        ans
    }
}
