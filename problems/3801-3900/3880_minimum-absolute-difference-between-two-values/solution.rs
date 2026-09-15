impl Solution {
    pub fn min_absolute_difference(nums: Vec<i32>) -> i32 {
        // Track the most recent 1 and most recent 2 seen so far; the closest
        // 1/2 pair is always caught the moment its second element is scanned.
        let mut last_one = -1i32;
        let mut last_two = -1i32;
        let mut best = -1i32;
        for (index, &value) in nums.iter().enumerate() {
            if value == 1 {
                if last_two != -1 {
                    let distance = index as i32 - last_two;
                    if best == -1 || distance < best {
                        best = distance;
                    }
                }
                last_one = index as i32;
            } else if value == 2 {
                if last_one != -1 {
                    let distance = index as i32 - last_one;
                    if best == -1 || distance < best {
                        best = distance;
                    }
                }
                last_two = index as i32;
            }
        }
        best
    }
}
