impl Solution {
    // An operation retargets one character anywhere, so only letter
    // counts matter. Condition 3 unifies both strings on one letter c:
    // every character that is not already c pays once. Conditions 1
    // and 2 share a boundary after letter c — the lower string pays
    // its letters above c, the higher one its letters at or below c —
    // and one sweep with running below/above totals prices both
    // orientations at once. The boundary stops after 'y': nothing can
    // sit above 'z', so 'z' can never cap the lower string.
    pub fn min_characters(a: String, b: String) -> i32 {
        let mut counts_a = [0i32; 26];
        let mut counts_b = [0i32; 26];
        for byte in a.bytes() {
            counts_a[(byte - b'a') as usize] += 1;
        }
        for byte in b.bytes() {
            counts_b[(byte - b'a') as usize] += 1;
        }
        let (n, m) = (a.len() as i32, b.len() as i32);
        let mut best = n + m;
        for i in 0..26 {
            best = best.min(n - counts_a[i] + m - counts_b[i]);
        }
        let (mut above_a, mut above_b) = (n, m);
        let (mut below_a, mut below_b) = (0, 0);
        for i in 0..25 {
            above_a -= counts_a[i];
            above_b -= counts_b[i];
            below_a += counts_a[i];
            below_b += counts_b[i];
            best = best.min(above_a + below_b).min(above_b + below_a);
        }
        best
    }
}
