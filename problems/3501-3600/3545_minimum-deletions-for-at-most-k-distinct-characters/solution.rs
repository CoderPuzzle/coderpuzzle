impl Solution {
    pub fn min_deletion(s: String, k: i32) -> i32 {
        // At most k distinct characters may survive, so keep the k most
        // frequent ones and delete every occurrence of the rest: the
        // answer is the sum of the (distinct - k) smallest frequencies.
        let mut counts = [0usize; 26];
        for ch in s.bytes() {
            counts[(ch - b'a') as usize] += 1;
        }
        let mut freqs: Vec<usize> = counts.into_iter().filter(|f| *f > 0).collect();
        freqs.sort_unstable();
        let drop = freqs.len().saturating_sub(k as usize);
        freqs[..drop].iter().sum::<usize>() as i32
    }
}
