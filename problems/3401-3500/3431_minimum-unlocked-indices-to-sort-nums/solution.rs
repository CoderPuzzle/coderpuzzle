impl Solution {
    // A swap only exchanges values differing by exactly 1, so a 1 and a 3
    // can never trade places: any 3 sitting before a 1 dooms the array.
    // Otherwise 1s only ever move left and 3s only ever move right, and
    // every swap they need lands on a boundary between the first 2 and
    // the last 1, or between the first 3 and the last 2.
    pub fn min_unlocked_indices(nums: Vec<i32>, locked: Vec<i32>) -> i32 {
        let n = nums.len() as i32;
        let mut first2 = n;
        let mut first3 = n;
        let mut last1 = -1;
        let mut last2 = -1;
        for (idx, v) in nums.iter().enumerate() {
            let i = idx as i32;
            match v {
                1 => last1 = i,
                2 => {
                    if i < first2 {
                        first2 = i;
                    }
                    last2 = i;
                }
                _ => {
                    if i < first3 {
                        first3 = i;
                    }
                }
            }
        }
        if first3 < last1 {
            return -1;
        }
        let mut total = 0;
        for (idx, lock) in locked.iter().enumerate() {
            let i = idx as i32;
            if *lock == 1 && (first2 <= i && i < last1 || first3 <= i && i < last2) {
                total += 1;
            }
        }
        total
    }
}
