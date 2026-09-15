struct AlternatingMaxTree {
    size: usize,
    tree: Vec<i64>,
}

impl AlternatingMaxTree {
    fn new(length: usize) -> Self {
        let mut size = 1;
        while size < length {
            size *= 2;
        }
        Self {
            size,
            tree: vec![0; 2 * size],
        }
    }

    fn update(&mut self, mut index: usize, value: i64) {
        index += self.size;
        self.tree[index] = self.tree[index].max(value);
        index /= 2;
        while index > 0 {
            self.tree[index] = self.tree[2 * index].max(self.tree[2 * index + 1]);
            index /= 2;
        }
    }

    fn query(&self, mut left: usize, mut right: usize) -> i64 {
        left += self.size;
        right += self.size;
        let mut best = 0;
        while left < right {
            if left & 1 == 1 {
                best = best.max(self.tree[left]);
                left += 1;
            }
            if right & 1 == 1 {
                right -= 1;
                best = best.max(self.tree[right]);
            }
            left /= 2;
            right /= 2;
        }
        best
    }
}

impl Solution {
    pub fn max_alternating_sum(nums: Vec<i32>, k: i32) -> i64 {
        let mut values = nums.clone();
        values.sort_unstable();
        values.dedup();
        let mut up_tree = AlternatingMaxTree::new(values.len());
        let mut down_tree = AlternatingMaxTree::new(values.len());
        let mut up = vec![0i64; nums.len()];
        let mut down = vec![0i64; nums.len()];
        let mut answer = 0;
        let k = k as usize;

        for i in 0..nums.len() {
            if i >= k {
                let eligible = i - k;
                let rank = values.binary_search(&nums[eligible]).unwrap();
                up_tree.update(rank, up[eligible]);
                down_tree.update(rank, down[eligible]);
            }
            let rank = values.binary_search(&nums[i]).unwrap();
            up[i] = nums[i] as i64 + down_tree.query(0, rank);
            down[i] = nums[i] as i64 + up_tree.query(rank + 1, values.len());
            answer = answer.max(up[i]).max(down[i]);
        }
        answer
    }
}
