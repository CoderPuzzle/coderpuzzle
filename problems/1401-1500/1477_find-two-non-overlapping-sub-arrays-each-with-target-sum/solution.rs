impl Solution {
    pub fn min_sum_of_lengths(arr: Vec<i32>, target: i64) -> i32 {
        let n = arr.len();
        let inf = i32::MAX / 2;
        let mut best = vec![inf; n];
        let mut answer = inf;
        let mut best_so_far = inf;
        let mut window_sum: i64 = 0;
        let mut left = 0usize;
        for right in 0..n {
            window_sum += arr[right] as i64;
            while window_sum > target {
                window_sum -= arr[left] as i64;
                left += 1;
            }
            if window_sum == target {
                let length = (right - left + 1) as i32;
                if left > 0 && best[left - 1] != inf {
                    answer = answer.min(best[left - 1] + length);
                }
                best_so_far = best_so_far.min(length);
            }
            best[right] = best_so_far;
        }
        if answer >= inf {
            -1
        } else {
            answer
        }
    }
}
