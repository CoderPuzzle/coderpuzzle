impl Solution {
    pub fn count_pairs(nums: Vec<i32>, low: i32, high: i32) -> i32 {
        // The range condition splits into two "at most" counts: the answer is
        // f(high) - f(low - 1), where f(K) counts earlier values y with
        // x XOR y <= K. Every value fits in 15 bits (2 * 10^4 < 2^15), so the
        // trie walks 15 levels, top bit first. Children of node live at
        // 2 * node and 2 * node + 1 in next; each element is counted against
        // the trie before it is inserted, so every unordered pair is counted
        // exactly once.
        let mut next: Vec<i32> = vec![-1, -1];
        let mut cnt: Vec<i32> = vec![0];
        let mut answer = 0i32;
        for &x in &nums {
            answer += count_at_most(&next, &cnt, x, high);
            answer -= count_at_most(&next, &cnt, x, low - 1);
            let mut node = 0usize;
            for b in (0..15).rev() {
                let d = ((x >> b) & 1) as usize;
                if next[2 * node + d] == -1 {
                    next[2 * node + d] = cnt.len() as i32;
                    next.push(-1);
                    next.push(-1);
                    cnt.push(0);
                }
                node = next[2 * node + d] as usize;
                cnt[node] += 1;
            }
        }
        answer
    }
}

// Number of trie values y with x XOR y <= k: a 1 bit of k counts the whole
// subtree that keeps the xor prefix equal so far (the remaining suffix is
// then strictly smaller) and descends the other child, while a 0 bit only
// lets the matching child continue.
fn count_at_most(next: &[i32], cnt: &[i32], x: i32, k: i32) -> i32 {
    let mut node = 0i32;
    let mut total = 0i32;
    for b in (0..15).rev() {
        let xb = ((x >> b) & 1) as usize;
        if (k >> b) & 1 == 1 {
            let equal = next[2 * node as usize + xb];
            if equal != -1 {
                total += cnt[equal as usize];
            }
            node = next[2 * node as usize + 1 - xb];
        } else {
            node = next[2 * node as usize + xb];
        }
        if node == -1 {
            return total;
        }
    }
    total + cnt[node as usize]
}
