impl Solution {
    pub fn min_operations(boxes: String) -> Vec<i32> {
        // One ball hop between adjacent boxes costs 1, so gathering into
        // box i costs sum |i - j| over boxes j holding a ball. Sweeping
        // left to right, moving the gather point from i-1 to i adds one
        // step per ball at or left of i — so carry (count, ops) forward.
        let b = boxes.as_bytes();
        let n = b.len();
        let mut answer = vec![0i32; n];
        let (mut count, mut ops) = (0i32, 0i32);
        for i in 0..n {
            answer[i] += ops;
            count += (b[i] == b'1') as i32;
            ops += count;
        }
        let (mut count, mut ops) = (0i32, 0i32);
        for i in (0..n).rev() {
            answer[i] += ops;
            count += (b[i] == b'1') as i32;
            ops += count;
        }
        answer
    }
}
