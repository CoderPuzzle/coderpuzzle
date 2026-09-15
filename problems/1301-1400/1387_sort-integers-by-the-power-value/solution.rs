use std::collections::HashMap;

impl Solution {
    pub fn get_kth(lo: i32, hi: i32, k: i32) -> i32 {
        // Memoized path replay: walk each value's Collatz chain, recording
        // the route until it lands on a value whose power is already known,
        // then back-fill the recorded path. Fully iterative, and shared
        // steps between values are computed once.
        let mut memo: HashMap<i64, i32> = HashMap::new();
        memo.insert(1, 0);
        let mut values: Vec<i32> = (lo..=hi).collect();
        values.sort_by_key(|&value| (Self::power(value as i64, &mut memo), value));
        values[(k - 1) as usize]
    }

    fn power(start: i64, memo: &mut HashMap<i64, i32>) -> i32 {
        let mut x = start;
        let mut path: Vec<i64> = Vec::new();
        while !memo.contains_key(&x) {
            path.push(x);
            x = if x % 2 == 0 { x / 2 } else { 3 * x + 1 };
        }
        let mut steps = memo[&x];
        for &value in path.iter().rev() {
            steps += 1;
            memo.insert(value, steps);
        }
        steps
    }
}
