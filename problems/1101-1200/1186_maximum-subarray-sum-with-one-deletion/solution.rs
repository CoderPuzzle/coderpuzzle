impl Solution {
    pub fn maximum_sum(arr: Vec<i32>) -> i32 {
        let n = arr.len();
        if n == 1 {
            return arr[0];
        }
        // no_del: max subarray sum ending at i with no deletion
        // one_del: max subarray sum ending at i with exactly one deletion
        let mut no_del: i64 = arr[0] as i64;
        let mut one_del: i64 = i64::MIN / 2;
        let mut best: i64 = arr[0] as i64;
        for i in 1..n {
            // two origins: deletion already used earlier and the subarray
            // extends through arr[i], or the deletion happens exactly now
            // (drop arr[i] from the previous no_del) — one_del must be
            // computed first so it reads the pre-update no_del
            one_del = (one_del + arr[i] as i64).max(no_del);
            no_del = (no_del + arr[i] as i64).max(arr[i] as i64);
            best = best.max(no_del.max(one_del));
        }
        best as i32
    }
}
