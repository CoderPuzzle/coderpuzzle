impl Solution {
    pub fn sum_subarray_mins(arr: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = arr.len();
        let mut left = vec![-1i64; n];
        let mut right = vec![n as i64; n];
        let mut stack: Vec<usize> = Vec::new();
        // left[i]: index of the previous strictly smaller element (pops >=),
        // with -1 letting the dominance span reach the left border.
        for i in 0..n {
            while let Some(&top) = stack.last() {
                if arr[top] >= arr[i] {
                    stack.pop();
                } else {
                    break;
                }
            }
            left[i] = stack.last().map(|&s| s as i64).unwrap_or(-1);
            stack.push(i);
        }
        stack.clear();
        // right[i]: next smaller-or-equal element (pops only >). The
        // asymmetry attributes tied minima to the leftmost position, so
        // no subarray is counted twice; n spans to the right border.
        for i in (0..n).rev() {
            while let Some(&top) = stack.last() {
                if arr[top] > arr[i] {
                    stack.pop();
                } else {
                    break;
                }
            }
            right[i] = stack.last().map(|&s| s as i64).unwrap_or(n as i64);
            stack.push(i);
        }
        // arr[i] is the minimum exactly when the subarray's endpoints lie in
        // (left[i], i] x [i, right[i]) — that product counts them all.
        let mut total: i64 = 0;
        for i in 0..n {
            total += arr[i] as i64 * (i as i64 - left[i]) * (right[i] - i as i64);
        }
        (total % MOD) as i32
    }
}
