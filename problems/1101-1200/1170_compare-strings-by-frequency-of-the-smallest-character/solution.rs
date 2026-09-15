impl Solution {
    fn f(s: &[u8]) -> i32 {
        // Smallest character of the string, then how often it appears.
        let smallest = *s.iter().min().unwrap();
        s.iter().filter(|&&c| c == smallest).count() as i32
    }

    pub fn num_smaller_by_frequency(queries: Vec<String>, words: Vec<String>) -> Vec<i32> {
        let mut freqs: Vec<i32> = words.iter().map(|w| Self::f(w.as_bytes())).collect();
        freqs.sort();
        queries
            .iter()
            .map(|q| {
                let p = Self::f(q.as_bytes());
                // Everything strictly above p forms one sorted suffix;
                // find where it starts.
                let mut lo = 0usize;
                let mut hi = freqs.len();
                while lo < hi {
                    let mid = (lo + hi) / 2;
                    if freqs[mid] <= p {
                        lo = mid + 1;
                    } else {
                        hi = mid;
                    }
                }
                (freqs.len() - lo) as i32
            })
            .collect()
    }
}
