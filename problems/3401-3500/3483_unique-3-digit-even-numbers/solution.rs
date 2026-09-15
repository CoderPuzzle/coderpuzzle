impl Solution {
    // Tally the digit supply once, then walk the 450 candidate numbers
    // (hundreds 1-9, tens 0-9, even units) and keep those whose digit
    // multiset fits the supply.
    pub fn total_numbers(digits: Vec<i32>) -> i32 {
        let mut counts = [0i32; 10];
        for &d in &digits {
            counts[d as usize] += 1;
        }
        let mut total = 0;
        for h in 1..10 {
            for t in 0..10 {
                for &u in &[0, 2, 4, 6, 8] {
                    let mut need = [0i32; 10];
                    need[h as usize] += 1;
                    need[t as usize] += 1;
                    need[u as usize] += 1;
                    if (0..10).all(|v| need[v] <= counts[v]) {
                        total += 1;
                    }
                }
            }
        }
        total
    }
}
