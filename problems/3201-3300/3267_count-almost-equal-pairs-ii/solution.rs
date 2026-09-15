use std::collections::{HashMap, HashSet};

impl Solution {
    pub fn count_pairs(nums: Vec<i32>) -> i32 {
        // Splitting the two operations between the numbers never helps:
        // the minimum number of digit swaps turning one padded string
        // into another obeys the triangle inequality, so x and y are
        // almost equal exactly when y is reachable from x by <= 2 swaps
        // of x's own digits, compared with leading zeros padded to the
        // longer length (that is how 1023 becomes 0213 = 213 and 1 meets
        // 100).
        //
        // Pad every number to the widest width w (<= 7), enumerate all
        // values reachable by 0, 1, or 2 swaps (at most 1 + C(w,2) +
        // C(w,2)^2 deduplicated states), and sweep left to right: add
        // the frequencies of already-seen numbers found in the reachable
        // set, then record the current number. Each pair is counted
        // once, via the later element querying the earlier one's actual
        // value.
        let widest = *nums.iter().max().unwrap();
        let w = widest.to_string().len();
        let mut pairs = Vec::new();
        for i in 0..w {
            for j in i + 1..w {
                pairs.push((i, j));
            }
        }
        let mut seen: HashMap<i32, i32> = HashMap::new();
        let mut ans: i32 = 0;
        for &x in &nums {
            let s = x.to_string();
            let mut d = vec![b'0'; w];
            for (k, c) in s.bytes().enumerate() {
                d[w - s.len() + k] = c;
            }
            let mut states: HashSet<i32> = HashSet::new();
            let value = |d: &[u8]| d.iter().fold(0i32, |acc, &c| acc * 10 + (c - b'0') as i32);
            states.insert(value(&d));
            for &(i, j) in &pairs {
                d.swap(i, j);
                states.insert(value(&d));
                for &(k, l) in &pairs {
                    d.swap(k, l);
                    states.insert(value(&d));
                    d.swap(k, l);
                }
                d.swap(i, j);
            }
            for v in states {
                if let Some(c) = seen.get(&v) {
                    ans += *c;
                }
            }
            *seen.entry(x).or_insert(0) += 1;
        }
        ans
    }
}
