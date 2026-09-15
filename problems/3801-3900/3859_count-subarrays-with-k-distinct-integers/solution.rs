use std::collections::HashMap;

struct SegmentTree {
    size: usize,
    inf: usize,
    count: Vec<usize>,
    minimum: Vec<usize>,
}

impl SegmentTree {
    fn new(n: usize) -> Self {
        let mut size = 1;
        while size < n + 1 {
            size *= 2;
        }
        Self {
            size,
            inf: n + 1,
            count: vec![0; 2 * size],
            minimum: vec![n + 1; 2 * size],
        }
    }

    fn update(&mut self, position: usize, active: bool, mth: usize) {
        let mut node = self.size + position;
        self.count[node] = usize::from(active);
        self.minimum[node] = if active { mth } else { self.inf };
        node /= 2;
        while node > 0 {
            self.count[node] = self.count[2 * node] + self.count[2 * node + 1];
            self.minimum[node] = self.minimum[2 * node].min(self.minimum[2 * node + 1]);
            node /= 2;
        }
    }

    fn kth_latest(&self, mut need: usize) -> usize {
        let mut node = 1;
        while node < self.size {
            let right = 2 * node + 1;
            if self.count[right] >= need {
                node = right;
            } else {
                need -= self.count[right];
                node = right - 1;
            }
        }
        node - self.size
    }

    fn range_minimum(&self, mut left: usize, mut right: usize) -> usize {
        left += self.size;
        right += self.size;
        let mut result = self.inf;
        while left <= right {
            if left & 1 != 0 {
                result = result.min(self.minimum[left]);
                left += 1;
            }
            if right & 1 == 0 {
                result = result.min(self.minimum[right]);
                right -= 1;
            }
            left /= 2;
            right /= 2;
        }
        result
    }
}

impl Solution {
    pub fn count_subarrays(nums: Vec<i32>, k: i32, m: i32) -> i64 {
        let n = nums.len();
        let k = k as usize;
        let m = m as usize;
        let mut tree = SegmentTree::new(n);
        let mut history: HashMap<i32, Vec<usize>> = HashMap::new();
        let mut answer = 0i64;

        for (index, value) in nums.into_iter().enumerate() {
            let right = index + 1;
            let places = history.entry(value).or_default();
            if let Some(&old) = places.last() {
                tree.update(old, false, 0);
            }
            places.push(right);
            let mth = if places.len() >= m { places[places.len() - m] } else { 0 };
            tree.update(right, true, mth);

            if tree.count[1] < k {
                continue;
            }
            let last_k = tree.kth_latest(k);
            let last_next = if tree.count[1] > k { tree.kth_latest(k + 1) } else { 0 };
            let min_mth = tree.range_minimum(last_k, n);
            answer += last_k.min(min_mth).saturating_sub(last_next) as i64;
        }
        answer
    }
}
