impl Solution {
    // Walk both encodings with running remainders; each step consumes
    // min(remaining1, remaining2) positions and emits one product run,
    // merging into the previous run when the product repeats.
    pub fn find_rle_array(encoded1: Vec<Vec<i32>>, encoded2: Vec<Vec<i32>>) -> Vec<Vec<i64>> {
        let mut out: Vec<Vec<i64>> = Vec::new();
        let (mut i, mut j) = (0usize, 0usize);
        let (mut rem1, mut rem2) = (encoded1[0][1] as i64, encoded2[0][1] as i64);
        loop {
            let take = rem1.min(rem2);
            let val = encoded1[i][0] as i64 * encoded2[j][0] as i64;
            match out.last_mut() {
                Some(run) if run[0] == val => run[1] += take,
                _ => out.push(vec![val, take]),
            }
            rem1 -= take;
            rem2 -= take;
            if rem1 == 0 {
                i += 1;
                if i == encoded1.len() {
                    break;
                }
                rem1 = encoded1[i][1] as i64;
            }
            if rem2 == 0 {
                j += 1;
                if j == encoded2.len() {
                    break;
                }
                rem2 = encoded2[j][1] as i64;
            }
        }
        out
    }
}
