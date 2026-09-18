pub struct NumArray {
    n: usize,
    nums: Vec<i32>,
    // Fenwick tree, 1-based: slot i holds the sum of the block of
    // length i & -i ending at i. Slot 0 stays unused so low-bit walks
    // terminate. Held in i64: prefix sums of 32-bit values.
    tree: Vec<i64>,
}

impl NumArray {
    pub fn new(nums: Vec<i32>) -> Self {
        let n = nums.len();
        let mut tree = vec![0i64; n + 1];
        // O(n) build: once a block sum is finished, push it straight into
        // its parent's slot — one pass instead of n updates.
        for index in 1..=n {
            tree[index] += nums[index - 1] as i64;
            let parent = index + (index & index.wrapping_neg());
            if parent <= n {
                tree[parent] += tree[index];
            }
        }
        NumArray { n, nums, tree }
    }

    pub fn update(&mut self, index: i32, value: i32) {
        // Only the delta is applied; nums keeps current values so the
        // next delta is computed correctly.
        let index = index as usize;
        let delta = value as i64 - self.nums[index] as i64;
        self.nums[index] = value;
        // Climb by the low bit to visit every block containing this cell.
        let mut position = index + 1;
        while position <= self.n {
            self.tree[position] += delta;
            position += position & position.wrapping_neg();
        }
    }

    pub fn sumRange(&mut self, left: i32, right: i32) -> i64 {
        // A range sum is the difference of two prefix sums.
        self.prefix(right as usize + 1) - self.prefix(left as usize)
    }

    fn prefix(&self, count: usize) -> i64 {
        let mut total = 0i64;
        let mut count = count;
        // Each step lands on a disjoint block whose union is exactly the
        // first `count` elements — O(log n) of them.
        while count > 0 {
            total += self.tree[count];
            count -= count & count.wrapping_neg();
        }
        total
    }
}
