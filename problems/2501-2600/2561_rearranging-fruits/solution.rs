use std::collections::HashMap;

impl Solution {
    pub fn min_cost(basket1: Vec<i32>, basket2: Vec<i32>) -> i64 {
        // A cost can only be balanced if its combined frequency across the
        // two baskets is even; an odd count makes equality impossible no
        // matter how fruits are swapped.
        let mut diff: HashMap<i32, i64> = HashMap::new();
        for &x in &basket1 {
            *diff.entry(x).or_insert(0) += 1;
        }
        for &x in &basket2 {
            *diff.entry(x).or_insert(0) -= 1;
        }
        // Every |diff| / 2 surplus copies become relocation tickets. Real
        // swaps always pair one export with one import, so among all pooled
        // tickets only the cheapest half genuinely travels far. A ticket
        // costing more than twice the global minimum m is never paid
        // directly: shuttle m out and back around it and the same unit of
        // imbalance clears for a flat 2*m. At most n tickets pay at most
        // n * 2 * 10^9 <= 2*10^14, i64-safe.
        let mut tickets: Vec<i64> = Vec::new();
        for (&value, &delta) in &diff {
            if delta % 2 != 0 {
                return -1;
            }
            for _ in 0..(delta.abs() / 2) {
                tickets.push(value as i64);
            }
        }
        let smallest = (*basket1.iter().min().unwrap()).min(*basket2.iter().min().unwrap()) as i64;
        tickets.sort_unstable();
        let half = tickets.len() / 2;
        let mut answer: i64 = 0;
        for t in &tickets[..half] {
            answer += (*t).min(2 * smallest);
        }
        answer
    }
}
