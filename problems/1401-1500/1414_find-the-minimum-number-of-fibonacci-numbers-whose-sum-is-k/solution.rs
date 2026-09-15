impl Solution {
    pub fn find_min_fibonacci_numbers(k: i32) -> i32 {
        let mut fibs: Vec<i64> = vec![1, 1];
        while fibs[fibs.len() - 1] + fibs[fibs.len() - 2] <= k as i64 {
            let next = fibs[fibs.len() - 1] + fibs[fibs.len() - 2];
            fibs.push(next);
        }
        // Zeckendorf: greedily taking the largest F <= k never lands on two
        // consecutive Fibonacci numbers, so this builds the unique minimal
        // (non-consecutive) representation term by term
        let mut count = 0;
        let mut remaining = k as i64;
        let mut index = fibs.len() - 1;
        while remaining > 0 {
            while fibs[index] > remaining {
                index -= 1;
            }
            remaining -= fibs[index];
            count += 1;
        }
        count
    }
}
