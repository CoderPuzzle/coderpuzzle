// Backtracking over the multiset of remaining values. Any expression tree
// evaluates bottom-up by combining two siblings at a time, so taking each
// unordered pair, applying every operator (both orders for '-' and '/'),
// and recursing on the shorter vector explores every expression exactly.
// Real division makes exact equality untestable in floating point, so a
// lone remaining value wins when it sits within EPS of 24.
impl Solution {
    pub fn judge_point24(cards: Vec<i32>) -> bool {
        let values: Vec<f64> = cards.iter().map(|&card| card as f64).collect();
        solve(&values)
    }
}

fn solve(values: &[f64]) -> bool {
    if values.len() == 1 {
        return (values[0] - 24.0).abs() < 1e-6;
    }
    let n = values.len();
    for i in 0..n {
        for j in (i + 1)..n {
            let (a, b) = (values[i], values[j]);
            let rest: Vec<f64> = values
                .iter()
                .enumerate()
                .filter(|&(k, _)| k != i && k != j)
                .map(|(_, &value)| value)
                .collect();
            let mut results = vec![a + b, a - b, b - a, a * b];
            if b != 0.0 {
                results.push(a / b);
            }
            if a != 0.0 {
                results.push(b / a);
            }
            for result in results {
                let mut next = rest.clone();
                next.push(result);
                if solve(&next) {
                    return true;
                }
            }
        }
    }
    false
}
