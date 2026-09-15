impl Solution {
    // Number of (a, b) with 0<=a<=A, 0<=b<=B, a+b<=K.
    fn count_pairs(a: i64, b: i64, k: i64) -> i64 {
        if k < 0 || a < 0 || b < 0 {
            return 0;
        }
        let a = a.min(k);
        let b = b.min(k);
        if a + b <= k {
            return (a + 1) * (b + 1);
        }
        let t = k - b;
        let mut total: i64 = 0;
        if t >= 0 {
            total += (a.min(t) + 1) * (b + 1);
        }
        let lo = (t + 1).max(0);
        if lo <= a {
            let m = a - lo + 1;
            total += m * (k + 1) - (lo + a) * m / 2;
        }
        total
    }

    pub fn min_max_subarray_sum(nums: Vec<i32>, k: i32) -> i64 {
        let n = nums.len();
        let kk = k as i64 - 1;

        let mut lmax = vec![0i64; n];
        let mut rmax = vec![0i64; n];
        let mut stack: Vec<usize> = Vec::new();
        for i in 0..n {
            while let Some(&top) = stack.last() {
                if nums[top] <= nums[i] {
                    stack.pop();
                } else {
                    break;
                }
            }
            lmax[i] = match stack.last() {
                Some(&top) => i as i64 - top as i64 - 1,
                None => i as i64,
            };
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
            rmax[i] = match stack.last() {
                Some(&top) => top as i64 - i as i64 - 1,
                None => n as i64 - 1 - i as i64,
            };
            stack.push(i);
        }

        let mut lmin = vec![0i64; n];
        let mut rmin = vec![0i64; n];
        stack.clear();
        for i in 0..n {
            while let Some(&top) = stack.last() {
                if nums[top] >= nums[i] {
                    stack.pop();
                } else {
                    break;
                }
            }
            lmin[i] = match stack.last() {
                Some(&top) => i as i64 - top as i64 - 1,
                None => i as i64,
            };
            stack.push(i);
        }
        stack.clear();
        for i in (0..n).rev() {
            while let Some(&top) = stack.last() {
                if nums[top] > nums[i] {
                    stack.pop();
                } else {
                    break;
                }
            }
            rmin[i] = match stack.last() {
                Some(&top) => top as i64 - i as i64 - 1,
                None => n as i64 - 1 - i as i64,
            };
            stack.push(i);
        }

        let mut answer: i64 = 0;
        for i in 0..n {
            let cnt = Self::count_pairs(lmax[i], rmax[i], kk) + Self::count_pairs(lmin[i], rmin[i], kk);
            answer += nums[i] as i64 * cnt;
        }
        answer
    }
}
