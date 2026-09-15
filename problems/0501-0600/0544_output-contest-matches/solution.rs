impl Solution {
    pub fn find_contest_match(n: i32) -> String {
        // One string per surviving side of the bracket, in round order. Each
        // round folds the list against its own reverse: side i meets side
        // m-1-i, the strong-vs-weak pairing, recorded as "(a,b)" with a bare
        // comma and no space.
        let mut sides: Vec<String> = (1..=n).map(|team| team.to_string()).collect();
        while sides.len() > 1 {
            let m = sides.len();
            let mut next = Vec::with_capacity(m / 2);
            for i in 0..m / 2 {
                next.push(format!("({},{})", sides[i], sides[m - 1 - i]));
            }
            sides = next;
        }
        sides.pop().unwrap()
    }
}
