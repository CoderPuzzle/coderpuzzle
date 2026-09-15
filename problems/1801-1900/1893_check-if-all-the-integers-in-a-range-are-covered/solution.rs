impl Solution {
    // +1 at start, -1 past end, running sum > 0 means covered.
    pub fn is_covered(ranges: Vec<Vec<i32>>, left: i32, right: i32) -> bool {
        let mut diff = vec![0i32; 52];
        for r in &ranges {
            diff[r[0] as usize] += 1;
            diff[r[1] as usize + 1] -= 1;
        }
        let mut cover = vec![false; 51];
        let mut cur = 0i32;
        for x in 1..=50usize {
            cur += diff[x];
            cover[x] = cur > 0;
        }
        (left..=right).all(|x| cover[x as usize])
    }
}
