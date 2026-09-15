impl Solution {
    pub fn nth_ugly_number(n: i32) -> i32 {
        let n = n as usize;
        // Every ugly number past 1 is a smaller ugly times 2, 3, or 5, so
        // the sequence is generated in order as the merge of three virtual
        // lists 2·U, 3·U, 5·U — no testing of arbitrary integers.
        let mut ugly = vec![0i32; n + 1];
        ugly[0] = 1;
        // One cursor per list, sitting on the source of its smallest
        // not-yet-emitted element.
        let (mut i2, mut i3, mut i5) = (0usize, 0usize, 0usize);
        for i in 1..=n {
            let m2 = ugly[i2] * 2;
            let m3 = ugly[i3] * 3;
            let m5 = ugly[i5] * 5;
            // The next ugly number is the smallest head of the three lists.
            let nxt = m2.min(m3).min(m5);
            ugly[i] = nxt;
            // Advance EVERY cursor whose candidate matched: 6 arises as
            // both 2·3 and 3·2, and the dual advance suppresses duplicates.
            if nxt == m2 {
                i2 += 1;
            }
            if nxt == m3 {
                i3 += 1;
            }
            if nxt == m5 {
                i5 += 1;
            }
        }
        // The array carries a leading 1, so the n-th ugly number is at n-1.
        ugly[n - 1]
    }
}
