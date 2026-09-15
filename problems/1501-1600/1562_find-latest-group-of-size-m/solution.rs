impl Solution {
    pub fn find_latest_step(arr: Vec<i32>, m: i32) -> i32 {
        let n = arr.len();
        // length[p] is meaningful only at the two ends of a 1-group: the
        // length of that group. Interior positions go stale once a group
        // grows past them, and are never read again.
        let mut length = vec![0i32; n + 2];
        // count[k] = how many groups currently have length exactly k.
        let mut count = vec![0i32; n + 1];
        let mut ans = -1;

        for step in 1..=n {
            let pos = arr[step - 1] as usize;
            let left = length[pos - 1];
            let right = length[pos + 1];
            let new_len = left + right + 1;
            length[pos - left as usize] = new_len;
            length[pos + right as usize] = new_len;
            if left > 0 {
                count[left as usize] -= 1;
            }
            if right > 0 {
                count[right as usize] -= 1;
            }
            count[new_len as usize] += 1;
            if count[m as usize] > 0 {
                ans = step as i32;
            }
        }

        ans
    }
}
