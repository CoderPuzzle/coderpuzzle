// Every box spends one truck slot regardless of type, so each slot should
// hold the richest box still available: sort by units per box descending
// and fill the truck front-to-back.
impl Solution {
    pub fn maximum_units(box_types: Vec<Vec<i32>>, truck_size: i32) -> i32 {
        let mut box_types = box_types;
        box_types.sort_by(|a, b| b[1].cmp(&a[1]));
        let mut units_total: i64 = 0;
        let mut remaining = truck_size;
        for box_type in &box_types {
            if remaining == 0 {
                break;
            }
            let take = box_type[0].min(remaining);
            // the total tops out at 10^9 — inside the 32-bit return range,
            // but narrowly, so the sum runs in an i64 and narrows on return
            units_total += take as i64 * box_type[1] as i64;
            remaining -= take;
        }
        units_total as i32
    }
}
