impl Solution {
    pub fn can_make_pali_queries(s: String, queries: Vec<Vec<i32>>) -> Vec<bool> {
        let bytes = s.as_bytes();
        let n = bytes.len();
        // prefix[i] = bitmask of parities of letter counts in s[:i]
        let mut prefix = vec![0i32; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] ^ (1 << (bytes[i] - b'a'));
        }
        let mut answer = Vec::with_capacity(queries.len());
        for query in &queries {
            let left = query[0] as usize;
            let right = query[1] as usize;
            let k = query[2];
            let mask = prefix[right + 1] ^ prefix[left];
            let odd = mask.count_ones();
            answer.push(odd / 2 <= k as u32);
        }
        answer
    }
}
