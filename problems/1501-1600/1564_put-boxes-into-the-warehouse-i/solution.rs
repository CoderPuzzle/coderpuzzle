impl Solution {
    pub fn max_boxes_in_warehouse(mut boxes: Vec<i32>, warehouse: Vec<i32>) -> i32 {
        // A box entering from room 0 can only ever reach room i if every
        // room 0..i also let it through, so the height that actually
        // matters at position i is the prefix minimum of warehouse[0..i].
        let n = warehouse.len();
        let mut effective = vec![0; n];
        let mut running_min = warehouse[0];
        for i in 0..n {
            running_min = running_min.min(warehouse[i]);
            effective[i] = running_min;
        }

        // effective is non-increasing outward-to-inward, so read it from the
        // back (deepest room, smallest allowance) forward. Match it against
        // boxes sorted ascending: the smallest remaining box is the best
        // fit for the tightest remaining room.
        boxes.sort();
        let mut placed = 0;
        let mut j = 0;
        for i in (0..n).rev() {
            if j >= boxes.len() {
                break;
            }
            if boxes[j] <= effective[i] {
                placed += 1;
                j += 1;
            }
        }
        placed
    }
}
