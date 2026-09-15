impl Solution {
    pub fn ip_to_cidr(ip: String, n: i32) -> Vec<String> {
        // The address lives in an i64: 2^32 (the alignment cap at address
        // 0) must be representable, and a 32-bit type would wrap.
        let mut x: i64 = 0;
        for part in ip.split('.') {
            x = x * 256 + part.parse::<i64>().unwrap();
        }
        let mut n = n as i64;
        let mut blocks: Vec<String> = Vec::new();
        while n > 0 {
            // A block of 2^k addresses must start at an address divisible
            // by 2^k, and may not overrun the remaining count. So the
            // largest block at x is its lowest set bit (its own alignment),
            // halved down until it fits n; at address 0 nothing is set, so
            // the whole 2^32 space aligns and only n caps the block.
            let mut block = if x != 0 { x & -x } else { 1i64 << 32 };
            while block > n {
                block >>= 1;
            }
            let prefix = 32 - block.trailing_zeros();
            blocks.push(format!(
                "{}.{}.{}.{}/{}",
                (x >> 24) & 255,
                (x >> 16) & 255,
                (x >> 8) & 255,
                x & 255,
                prefix
            ));
            x += block;
            n -= block;
        }
        blocks
    }
}
