impl Solution {
    pub fn len_longest_fib_subseq(arr: Vec<i32>) -> i32 {
        let n = arr.len();
        let mut index_of: std::collections::HashMap<i32, usize> = std::collections::HashMap::new();
        for (i, &v) in arr.iter().enumerate() {
            index_of.insert(v, i);
        }
        // dp[j][i] = longest Fibonacci-like subsequence ending with arr[j], arr[i]
        let mut dp = vec![vec![2i32; n]; n];
        let mut best = 0;
        for i in 0..n {
            for j in 0..i {
                let need = arr[i] - arr[j];
                if need < arr[j] {
                    if let Some(&k) = index_of.get(&need) {
                        dp[j][i] = dp[k][j] + 1;
                        if dp[j][i] > best {
                            best = dp[j][i];
                        }
                    }
                }
            }
        }
        if best >= 3 {
            best
        } else {
            0
        }
    }
}
