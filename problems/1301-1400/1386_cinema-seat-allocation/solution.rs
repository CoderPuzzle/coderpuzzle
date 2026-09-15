use std::collections::HashMap;

impl Solution {
    pub fn max_number_of_families(n: i32, reserved_seats: Vec<Vec<i32>>) -> i32 {
        const LEFT: i32 = 0b0000011110; // seats 2-5
        const RIGHT: i32 = 0b0111100000; // seats 6-9
        const MIDDLE: i32 = 0b0001111000; // seats 4-7
        let mut masks: HashMap<i32, i32> = HashMap::new();
        for seat in &reserved_seats {
            *masks.entry(seat[0]).or_insert(0) |= 1 << (seat[1] - 1);
        }
        let mut groups = 2i64 * (n as i64 - masks.len() as i64);
        for mask in masks.values() {
            if mask & (LEFT | RIGHT) == 0 {
                groups += 2;
            } else if mask & LEFT == 0 || mask & MIDDLE == 0 || mask & RIGHT == 0 {
                groups += 1;
            }
        }
        groups as i32
    }
}
