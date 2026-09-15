use std::collections::HashMap;

impl Solution {
    pub fn min_arrivals_to_discard(arrivals: Vec<i32>, w: i32, m: i32) -> i32 {
        // cnt holds how many kept arrivals of each type sit inside the
        // current w-day window; kept[i] records whether day i was kept,
        // since a discarded arrival never entered the counts and must not
        // be decremented when its day slides out of the window.
        let mut cnt: HashMap<i32, i32> = HashMap::new();
        let mut kept = vec![false; arrivals.len()];
        let mut discards = 0i32;
        for i in 0..arrivals.len() {
            if i >= w as usize && kept[i - w as usize] {
                *cnt.get_mut(&arrivals[i - w as usize]).unwrap() -= 1;
            }
            let count = cnt.entry(arrivals[i]).or_insert(0);
            if *count == m {
                discards += 1;
            } else {
                kept[i] = true;
                *count += 1;
            }
        }
        discards
    }
}
