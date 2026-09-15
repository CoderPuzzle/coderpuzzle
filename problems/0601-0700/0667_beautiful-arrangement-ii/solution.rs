impl Solution {
    // The first k+1 slots alternate between the two ends of 1..k+1 —
    // 1, k+1, 2, k, 3, k-1, ... — so their adjacent differences walk
    // down k, k-1, ..., 1, each distinct value exactly once. The values
    // k+2..n then follow in ascending order: the junction difference
    // falls back inside 1..k and every later difference is 1, so the
    // k values already seen are the final count.
    pub fn construct_array(n: i32, k: i32) -> Vec<i32> {
        let (n, k) = (n as usize, k as usize);
        let mut answer = Vec::with_capacity(n);
        let (mut low, mut high) = (1, k + 1);
        for i in 0..=k {
            if i % 2 == 0 {
                answer.push(low as i32);
                low += 1;
            } else {
                answer.push(high as i32);
                high -= 1;
            }
        }
        answer.extend((k + 2..=n).map(|v| v as i32));
        answer
    }
}
