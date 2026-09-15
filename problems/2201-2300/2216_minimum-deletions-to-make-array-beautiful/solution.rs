// Build the kept array greedily: an even slot takes anything, an odd slot
// must differ from its pair, so an equal arrival is the deletion.
impl Solution {
    pub fn min_deletion(nums: Vec<i32>) -> i32 {
        let (mut deletions, mut kept, mut pair_first) = (0, 0, 0);
        for &value in &nums {
            if kept % 2 == 0 {
                pair_first = value;
                kept += 1;
            } else if value != pair_first {
                kept += 1;
            } else {
                deletions += 1;
            }
        }
        if kept % 2 == 1 {
            // An odd tail can never be paired; its last element goes too.
            deletions += 1;
        }
        deletions
    }
}
