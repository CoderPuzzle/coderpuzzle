impl Solution {
    pub fn count_valid_subarrays(nums: Vec<i32>, x: i32) -> i64 {
        let n = nums.len();
        let mut prefix = vec![0i64; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] + nums[i] as i64;
        }

        let mut answer: i64 = 0;
        // Window p covers sums whose first digit is x: [x*10^p, (x+1)*10^p-1].
        let mut scale: i64 = 1;
        for _ in 0..16 {
            let lo = x as i64 * scale;
            let hi = (x as i64 + 1) * scale - 1;
            scale *= 10;
            if lo > prefix[n] {
                break;
            }
            let mut left: usize = 0;
            let mut entered: usize = 0; // prefix indices [left, entered) are inside the window
            let mut residue = [0i64; 10];
            for j in 1..=n {
                let floor = prefix[j] - hi;
                let ceiling = prefix[j] - lo;
                while entered < j && prefix[entered] <= ceiling {
                    residue[(prefix[entered] % 10) as usize] += 1;
                    entered += 1;
                }
                while prefix[left] < floor {
                    residue[(prefix[left] % 10) as usize] -= 1;
                    left += 1;
                }
                let target = ((prefix[j] - x as i64) % 10 + 10) % 10;
                answer += residue[target as usize];
            }
        }
        answer
    }
}
