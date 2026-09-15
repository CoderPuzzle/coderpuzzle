impl Solution {
    // A prefix flip ending at i-1 (cost i) toggles exactly the left side
    // of border i, and a suffix flip starting at i (cost n-i) toggles
    // exactly its right side; so whenever s[i-1] != s[i], one of the two
    // runs an odd number of times -- pay the cheaper. Borders touch no
    // shared operation, making each fix independent. The sum peaks at
    // n^2/4 ~= 2.5e9, hence the i64 accumulator.
    pub fn minimum_cost(s: String) -> i64 {
        let b = s.as_bytes();
        let n = b.len() as i64;
        let mut ans = 0i64;
        for i in 1..b.len() {
            if b[i] != b[i - 1] {
                let i = i as i64;
                ans += i.min(n - i);
            }
        }
        ans
    }
}
