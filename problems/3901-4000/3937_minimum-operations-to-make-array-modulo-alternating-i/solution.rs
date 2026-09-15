impl Solution {
    pub fn min_operations(nums: Vec<i32>, k: i32) -> i32 {
        let remainders: Vec<i32> = nums.iter().map(|value| value % k).collect();
        let mut answer = i32::MAX;
        for x in 0..k {
            for y in 0..k {
                if x == y {
                    continue;
                }
                let mut total = 0i64;
                for (i, current) in remainders.iter().enumerate() {
                    let target = if i % 2 == 0 { x } else { y };
                    let up = (target - current + k) % k;
                    let down = (current - target + k) % k;
                    total += up.min(down) as i64;
                }
                answer = answer.min(total as i32);
            }
        }
        answer
    }
}
