impl Solution {
    // A subarray is good iff its bitwise OR equals its maximum element, i.e.
    // every element's bits are contained in the max's bits. Count each
    // subarray at its rightmost maximum: index i owns subarrays inside
    // (left[i], right[i]) from two monotonic stacks, and the bit condition
    // shrinks that window to the nearest element on each side carrying a bit
    // absent from nums[i]. At n = 10^5 the answer reaches n(n+1)/2 ~ 5*10^9,
    // so the accumulator is an i64.
    pub fn count_good_subarrays(nums: Vec<i32>) -> i64 {
        let n = nums.len();
        let mut left = vec![-1i32; n];
        let mut right = vec![n as i32; n];
        let mut stack: Vec<usize> = Vec::with_capacity(n);
        for i in 0..n {
            while let Some(&top) = stack.last() {
                if nums[top] <= nums[i] {
                    stack.pop();
                } else {
                    break;
                }
            }
            left[i] = stack.last().map(|&x| x as i32).unwrap_or(-1);
            stack.push(i);
        }
        stack.clear();
        for i in (0..n).rev() {
            while let Some(&top) = stack.last() {
                if nums[top] < nums[i] {
                    stack.pop();
                } else {
                    break;
                }
            }
            right[i] = stack.last().map(|&x| x as i32).unwrap_or(n as i32);
            stack.push(i);
        }
        let bits = 31usize; // nums[i] < 2^30; bit 30 stays unused
        let mut last = vec![-1i32; bits];
        let mut nxt = vec![n as i32; bits];
        let mut max_left = vec![-1i32; n];
        let mut min_right = vec![n as i32; n];
        for i in 0..n {
            let x = nums[i];
            let mut m = -1;
            for b in 0..bits {
                if ((x >> b) & 1) == 0 && last[b] > m {
                    m = last[b];
                }
            }
            max_left[i] = m;
            let mut y = x;
            while y != 0 {
                let low = y & -y;
                last[low.trailing_zeros() as usize] = i as i32;
                y ^= low;
            }
        }
        for i in (0..n).rev() {
            let x = nums[i];
            let mut m = n as i32;
            for b in 0..bits {
                if ((x >> b) & 1) == 0 && nxt[b] < m {
                    m = nxt[b];
                }
            }
            min_right[i] = m;
            let mut y = x;
            while y != 0 {
                let low = y & -y;
                nxt[low.trailing_zeros() as usize] = i as i32;
                y ^= low;
            }
        }
        let mut ans = 0i64;
        for i in 0..n {
            let lo = left[i].max(max_left[i]);
            let hi = right[i].min(min_right[i]);
            ans += (i as i64 - lo as i64) * (hi as i64 - i as i64);
        }
        ans
    }
}
