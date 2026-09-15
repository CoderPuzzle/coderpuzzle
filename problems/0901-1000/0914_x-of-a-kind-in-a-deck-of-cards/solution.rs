use std::collections::HashMap;

impl Solution {
    // A group is x cards of one value, so once x is picked every count must
    // split into whole groups of x: each count a multiple of x, every card
    // in exactly one group. A partition exists exactly when some x >= 2
    // divides every count at once, i.e. when the gcd of all counts reaches
    // 2. The fold seeds with 0 because gcd(0, c) = c, so each count is
    // absorbed and the running value stays the gcd of the counts seen so
    // far.
    pub fn has_groups_size_x(deck: Vec<i32>) -> bool {
        let mut counts: HashMap<i32, i32> = HashMap::new();
        for &card in deck.iter() {
            *counts.entry(card).or_insert(0) += 1;
        }
        let mut common = 0;
        for &count in counts.values() {
            common = gcd(common, count);
        }
        common >= 2
    }
}

fn gcd(mut a: i32, mut b: i32) -> i32 {
    while b != 0 {
        let remainder = a % b;
        a = b;
        b = remainder;
    }
    a
}
