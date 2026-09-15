impl Solution {
    pub fn min_available_duration(mut slots1: Vec<Vec<i64>>, mut slots2: Vec<Vec<i64>>, duration: i32) -> Vec<i64> {
        slots1.sort_by_key(|slot| slot[0]);
        slots2.sort_by_key(|slot| slot[0]);
        let (mut i, mut j) = (0usize, 0usize);
        while i < slots1.len() && j < slots2.len() {
            let start = slots1[i][0].max(slots2[j][0]);
            let end = slots1[i][1].min(slots2[j][1]);
            if end - start >= duration as i64 {
                return vec![start, start + duration as i64];
            }
            // The earlier-ending slot cannot overlap any later slot of the
            // other person, so only that pointer advances.
            if slots1[i][1] < slots2[j][1] {
                i += 1;
            } else {
                j += 1;
            }
        }
        Vec::new()
    }
}
