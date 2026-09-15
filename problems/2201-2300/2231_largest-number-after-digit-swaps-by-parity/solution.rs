impl Solution {
    pub fn largest_integer(num: i32) -> i32 {
        let digits: Vec<u8> = num.to_string().into_bytes();
        let mut buckets: [Vec<u8>; 2] = [Vec::new(), Vec::new()];
        for &ch in &digits {
            buckets[(ch - b'0') as usize % 2].push(ch);
        }
        buckets[0].sort_unstable_by(|a, b| b.cmp(a));
        buckets[1].sort_unstable_by(|a, b| b.cmp(a));
        let mut cursors = [0usize; 2];
        let mut out = String::new();
        for &ch in &digits {
            let parity = (ch - b'0') as usize % 2;
            let bucket = &mut buckets[parity];
            out.push(bucket[cursors[parity]] as char);
            cursors[parity] += 1;
        }
        out.parse().expect("same digit count")
    }
}
