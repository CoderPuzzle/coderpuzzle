impl Solution {
    pub fn count_complete_substrings(word: String, k: i32) -> i32 {
        let bytes = word.as_bytes();
        let n = bytes.len();
        let vals: Vec<i32> = bytes.iter().map(|b| (b - b'a') as i32).collect();
        let mut total = 0;
        let mut start = 0usize;
        while start < n {
            let mut end = start + 1;
            while end < n && (vals[end] - vals[end - 1]).abs() <= 2 {
                end += 1;
            }
            let seg_len = end - start;
            for m in 1..=26 {
                let len = (m as i32 * k) as usize;
                if len > seg_len {
                    break;
                }
                let mut cnt = [0i32; 26];
                let mut bad = 0i32;
                for i in start..start + len {
                    let old = cnt[vals[i] as usize];
                    if old + 1 == k {
                        if old != 0 {
                            bad -= 1;
                        }
                    } else if old == 0 || old == k {
                        bad += 1;
                    }
                    cnt[vals[i] as usize] = old + 1;
                }
                if bad == 0 {
                    total += 1;
                }
                let mut left = start;
                for right in start + len..end {
                    let old = cnt[vals[right] as usize];
                    if old + 1 == k {
                        if old != 0 {
                            bad -= 1;
                        }
                    } else if old == 0 || old == k {
                        bad += 1;
                    }
                    cnt[vals[right] as usize] = old + 1;
                    let old = cnt[vals[left] as usize];
                    let new_cnt = old - 1;
                    cnt[vals[left] as usize] = new_cnt;
                    if new_cnt == k {
                        bad -= 1;
                    } else if new_cnt == 0 {
                        if k > 1 {
                            bad -= 1;
                        }
                    } else if new_cnt + 1 == k {
                        bad += 1;
                    }
                    left += 1;
                    if bad == 0 {
                        total += 1;
                    }
                }
            }
            start = end;
        }
        total
    }
}
