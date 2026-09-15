impl Solution {
    // Two pointers walk both strings at once; each step reads the revision at
    // each pointer as a number, so leading zeros vanish into the value instead
    // of poisoning the comparison.
    pub fn compare_version(version1: String, version2: String) -> i32 {
        let v1 = version1.as_bytes();
        let v2 = version2.as_bytes();
        let (n, m) = (v1.len(), v2.len());
        let (mut i, mut j) = (0, 0);
        while i < n || j < m {
            let mut a: i64 = 0;
            while i < n && v1[i] != b'.' {
                a = a * 10 + (v1[i] - b'0') as i64;
                i += 1;
            }
            let mut b: i64 = 0;
            while j < m && v2[j] != b'.' {
                b = b * 10 + (v2[j] - b'0') as i64;
                j += 1;
            }
            if a != b {
                return if a < b { -1 } else { 1 };
            }
            // Step past the dot; a spent string leaves its pointer at n.
            if i < n {
                i += 1;
            }
            if j < m {
                j += 1;
            }
        }
        0
    }
}
