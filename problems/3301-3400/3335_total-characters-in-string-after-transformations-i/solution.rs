// Only the per-letter counts matter. One transformation shifts the
// 26-vector one letter up (each of b..z receives its predecessor's count)
// and splits every z into an a and a b: after the shift the new
// counts[0] is the old z-count, and the old a-count gains the old z-count
// on top. Reducing counts[1] below MOD per sweep keeps every entry below
// MOD forever: a sweep's entries stay below 2 * MOD, but the 26-bucket
// total reaches ~2.7 * 10^10, so everything accumulates in i64.
impl Solution {
    pub fn length_after_transformations(s: String, t: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let mut counts = [0i64; 26];
        for ch in s.chars() {
            counts[(ch as u8 - b'a') as usize] += 1;
        }
        for _ in 0..t {
            let z = counts[25];
            for j in (1..26).rev() {
                counts[j] = counts[j - 1];
            }
            counts[0] = z;
            counts[1] = (counts[1] + z) % MOD;
        }
        let total: i64 = counts.iter().sum();
        (total % MOD) as i32
    }
}
