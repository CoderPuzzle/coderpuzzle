impl Solution {
    pub fn max_boxes_in_warehouse(mut boxes: Vec<i32>, warehouse: Vec<i32>) -> i32 {
        // A box can enter from either side, so room i only has to survive
        // whichever path is more forgiving: the prefix minimum coming from
        // the left, or the suffix minimum coming from the right.
        let n = warehouse.len();
        let mut prefix_min = vec![0; n];
        let mut running = warehouse[0];
        for i in 0..n {
            running = running.min(warehouse[i]);
            prefix_min[i] = running;
        }

        let mut suffix_min = vec![0; n];
        running = warehouse[n - 1];
        for i in (0..n).rev() {
            running = running.min(warehouse[i]);
            suffix_min[i] = running;
        }

        let mut effective: Vec<i32> = (0..n).map(|i| prefix_min[i].max(suffix_min[i])).collect();

        // effective is no longer monotonic, so sort both sides and sweep
        // with two pointers: the smallest remaining box is the best fit
        // for the smallest remaining room capacity.
        effective.sort();
        boxes.sort();
        let mut placed = 0;
        let mut j = 0;
        for e in effective {
            if j >= boxes.len() {
                break;
            }
            if boxes[j] <= e {
                placed += 1;
                j += 1;
            }
        }
        placed
    }
}
