impl Solution {
    pub fn maximum_sum(nums: Vec<i32>, m: i32, l: i32, r: i32) -> i64 {
        let n = nums.len();
        let low_length = l as usize;
        let high_length = r as usize;
        let mut prefix = vec![0_i64; n + 1];
        for index in 0..n {
            prefix[index + 1] = prefix[index] + nums[index] as i64;
        }

        let mut values = vec![0_i64; n + 1];
        let mut counts = vec![0_i32; n + 1];
        let mut queue = vec![0_usize; n + 1];
        let mut evaluate = |penalty: i64| -> (i64, i32) {
            let mut head = 0_usize;
            let mut tail = 0_usize;
            values[0] = 0;
            counts[0] = 0;
            for end in 1..=n {
                if end >= low_length {
                    let start = end - low_length;
                    let key = values[start] - prefix[start];
                    while tail > head {
                        let back = queue[tail - 1];
                        let back_key = values[back] - prefix[back];
                        if back_key > key || (back_key == key && counts[back] > counts[start]) {
                            break;
                        }
                        tail -= 1;
                    }
                    queue[tail] = start;
                    tail += 1;
                }
                while head < tail && queue[head] + high_length < end {
                    head += 1;
                }

                values[end] = values[end - 1];
                counts[end] = counts[end - 1];
                if head < tail {
                    let start = queue[head];
                    let take_value = prefix[end] - penalty + values[start] - prefix[start];
                    let take_count = counts[start] + 1;
                    if take_value > values[end] || (take_value == values[end] && take_count > counts[end]) {
                        values[end] = take_value;
                        counts[end] = take_count;
                    }
                }
            }
            (values[n], counts[n])
        };

        let (value, count) = evaluate(0);
        if count == 0 {
            let mut head = 0_usize;
            let mut tail = 0_usize;
            let mut best = i64::MIN;
            for end in 1..=n {
                if end >= low_length {
                    let start = end - low_length;
                    while tail > head && prefix[queue[tail - 1]] >= prefix[start] {
                        tail -= 1;
                    }
                    queue[tail] = start;
                    tail += 1;
                }
                while head < tail && queue[head] + high_length < end {
                    head += 1;
                }
                if head < tail {
                    best = best.max(prefix[end] - prefix[queue[head]]);
                }
            }
            return best;
        }
        if count <= m {
            return value;
        }

        let max_abs = nums.iter().map(|&value| (value as i64).abs()).max().unwrap();
        let mut low_penalty = 0_i64;
        let mut high_penalty = max_abs * n as i64 + 1;
        while low_penalty < high_penalty {
            let penalty = (low_penalty + high_penalty + 1) / 2;
            if evaluate(penalty).1 >= m {
                low_penalty = penalty;
            } else {
                high_penalty = penalty - 1;
            }
        }
        evaluate(low_penalty).0 + low_penalty * m as i64
    }
}
