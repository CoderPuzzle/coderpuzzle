impl Solution {
    pub fn can_three_parts_equal_sum(arr: Vec<i32>) -> bool {
        // If the total isn't a multiple of 3, no equal three-way split can
        // exist. Otherwise each part must sum to target = total / 3.
        let total: i32 = arr.iter().sum();
        if total % 3 != 0 {
            return false;
        }
        let target = total / 3;
        // Scan for two target-sum boundaries, stopping before the last
        // index so at least one element is always left for the third part.
        // Once total == 3 * target, whatever remains after two hits is
        // guaranteed to sum to target too, so it never needs scanning.
        let mut count = 0;
        let mut running = 0;
        for &value in &arr[..arr.len() - 1] {
            running += value;
            if running == target {
                count += 1;
                running = 0;
                if count == 2 {
                    return true;
                }
            }
        }
        false
    }
}
