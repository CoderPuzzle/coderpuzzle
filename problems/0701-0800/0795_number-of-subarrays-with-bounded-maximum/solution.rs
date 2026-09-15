impl Solution {
    fn count_below(nums: &Vec<i32>, bound: i32) -> i64 {
        // One-sided count of subarrays whose max is <= bound; the
        // answer follows by subtracting the two bounds.
        let mut total = 0i64;
        let mut run = 0i64;
        for &v in nums {
            if v <= bound {
                // run = length of the current streak of in-bounds
                // elements: this element ends exactly run new
                // subarrays, each counted once at its right end.
                run += 1;
                total += run;
            } else {
                // Above the bound: no valid subarray crosses here.
                run = 0;
            }
        }
        total
    }

    pub fn num_subarray_bounded_max(nums: Vec<i32>, left: i32, right: i32) -> i32 {
        // Max in [left, right] iff at most right but not at most
        // left - 1; with left = 0 the subtracted count is empty.
        (Self::count_below(&nums, right) - Self::count_below(&nums, left - 1)) as i32
    }
}
