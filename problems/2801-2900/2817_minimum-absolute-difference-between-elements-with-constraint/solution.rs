use std::collections::HashMap;

impl Solution {
    pub fn min_absolute_difference(nums: Vec<i32>, x: i32) -> i32 {
        // A pair consists of two distinct indices, so x == 0 still demands a
        // separation of at least one index step. All values fit in i32 and
        // any difference stays below 10^9.
        let separation = x.max(1);
        let mut vals = nums.clone();
        vals.sort_unstable();
        vals.dedup();
        let m = vals.len() as i32;
        let mut rank: HashMap<i32, i32> = HashMap::new();
        for (i, v) in vals.iter().enumerate() {
            rank.insert(*v, i as i32 + 1);
        }
        let mut tree = vec![0i32; (m + 1) as usize];
        let mut top: i32 = 1;
        while top * 2 <= m {
            top *= 2;
        }
        let mut answer: i32 = -1;
        for j in 0..(nums.len() as i32) {
            if j >= separation {
                // Partner nums[j - separation] enters the eligible prefix
                // before nums[j] queries it.
                let mut i = rank[&nums[(j - separation) as usize]];
                while i <= m {
                    tree[i as usize] += 1;
                    i += i & (-i);
                }
                let value = nums[j as usize];
                let mut count = 0i32;
                let mut i = rank[&value];
                while i > 0 {
                    count += tree[i as usize];
                    i -= i & (-i);
                }
                let have = j - separation + 1;
                if count > 0 {
                    let mut pos = 0i32;
                    let mut rem = count;
                    let mut step = top;
                    while step > 0 {
                        let nxt = pos + step;
                        if nxt <= m && tree[nxt as usize] < rem {
                            pos = nxt;
                            rem -= tree[nxt as usize];
                        }
                        step >>= 1;
                    }
                    let difference = value - vals[pos as usize];
                    if answer < 0 || difference < answer {
                        answer = difference;
                    }
                }
                if have > count {
                    let mut pos = 0i32;
                    let mut rem = count + 1;
                    let mut step = top;
                    while step > 0 {
                        let nxt = pos + step;
                        if nxt <= m && tree[nxt as usize] < rem {
                            pos = nxt;
                            rem -= tree[nxt as usize];
                        }
                        step >>= 1;
                    }
                    let difference = vals[pos as usize] - value;
                    if answer < 0 || difference < answer {
                        answer = difference;
                    }
                }
            }
        }
        answer
    }
}
