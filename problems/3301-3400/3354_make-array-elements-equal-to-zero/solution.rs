impl Solution {
    // The constraints are tiny, so replay the process literally: for every
    // zero cell walk both directions on a scratch copy. A zero cell
    // advances curr; a positive cell is decremented and flips the direction
    // before the step. A selection counts when the walk leaves the array
    // with every value at zero.
    pub fn count_valid_selections(nums: Vec<i32>) -> i32 {
        fn finishes(cells: &mut Vec<i32>, start: i32, mut step: i32) -> bool {
            let mut curr = start;
            while curr >= 0 && curr < cells.len() as i32 {
                let idx = curr as usize;
                if cells[idx] == 0 {
                    curr += step;
                } else {
                    cells[idx] -= 1;
                    step = -step;
                    curr += step;
                }
            }
            cells.iter().all(|&cell| cell == 0)
        }
        let mut total = 0;
        for i in 0..nums.len() {
            if nums[i] == 0 {
                if finishes(&mut nums.clone(), i as i32, 1) {
                    total += 1;
                }
                if finishes(&mut nums.clone(), i as i32, -1) {
                    total += 1;
                }
            }
        }
        total
    }
}
