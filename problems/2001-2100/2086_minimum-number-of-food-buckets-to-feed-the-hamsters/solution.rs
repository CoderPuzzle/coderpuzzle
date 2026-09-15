impl Solution {
    pub fn minimum_buckets(hamsters: String) -> i32 {
        let mut street = hamsters.into_bytes();
        let mut buckets = 0;
        for index in 0..street.len() {
            if street[index] != b'H' {
                continue;
            }
            if index > 0 && street[index - 1] == b'B' {
                continue;
            }
            if index + 1 < street.len() && street[index + 1] == b'.' {
                street[index + 1] = b'B';
                buckets += 1;
            } else if index > 0 && street[index - 1] == b'.' {
                street[index - 1] = b'B';
                buckets += 1;
            } else {
                return -1;
            }
        }
        buckets
    }
}
