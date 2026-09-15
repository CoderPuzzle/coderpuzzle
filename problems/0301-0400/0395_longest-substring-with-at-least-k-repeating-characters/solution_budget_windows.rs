impl Solution {
    pub fn longest_substring(s: String, k: i32) -> i32 {
        let bytes = s.as_bytes();
        let mut best = 0;
        // Every qualifying window holds between 1 and 26 distinct letters.
        // Pin that count as a budget and the window rule -- no more than
        // budget distinct letters -- becomes one two pointers can maintain.
        for budget in 1..=26 {
            best = best.max(Self::sweep(bytes, k, budget));
        }
        best
    }

    fn sweep(s: &[u8], k: i32, budget: i32) -> i32 {
        let mut counts = [0i32; 128];
        let mut distinct = 0;
        let mut qualified = 0;
        let mut best = 0;
        let mut left = 0;
        for right in 0..s.len() {
            let ch = s[right] as usize;
            if counts[ch] == 0 {
                distinct += 1;
            }
            counts[ch] += 1;
            if counts[ch] == k {
                qualified += 1;
            }
            // Growing a window never lowers its letter variety, so once the
            // window busts the budget only shrinking repairs it: left advances
            // monotonically and never backtracks.
            while distinct > budget {
                let out = s[left] as usize;
                left += 1;
                if counts[out] == k {
                    qualified -= 1;
                }
                counts[out] -= 1;
                if counts[out] == 0 {
                    distinct -= 1;
                }
            }
            // qualified never exceeds distinct, which never exceeds the budget,
            // so reaching the budget means exactly budget letters are present
            // and each has reached k. A letter rarer than k across the whole
            // string never joins qualified, so windows relying on it stay
            // unrecorded.
            if qualified == budget {
                best = best.max((right - left + 1) as i32);
            }
        }
        best
    }
}
