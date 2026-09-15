// A sparse vector keeps only its nonzero (index, value) pairs — the
// indices arrive in increasing order by construction — so a vector of
// length 1e5 with three nonzero entries stores three pairs. The dot
// product then merges the two sorted pair lists with two cursors: equal
// indices contribute one product and advance both cursors, a smaller
// index advances alone because its partner there is zero. The bound
// 1e5 * 100 * 100 = 1e9 still fits an i32.
pub struct SparseVector {
    pairs: Vec<(usize, i32)>,
}

impl SparseVector {
    pub fn new(nums: Vec<i32>) -> Self {
        let mut pairs = Vec::with_capacity(nums.len() / 64 + 1);
        for (index, value) in nums.into_iter().enumerate() {
            if value != 0 {
                pairs.push((index, value));
            }
        }
        SparseVector { pairs }
    }

    pub fn dotProduct(&mut self, vec: &mut SparseVector) -> i32 {
        let mut total: i32 = 0;
        let mut left = 0;
        let mut right = 0;
        while left < self.pairs.len() && right < vec.pairs.len() {
            let (index_a, value_a) = self.pairs[left];
            let (index_b, value_b) = vec.pairs[right];
            if index_a == index_b {
                total += value_a * value_b;
                left += 1;
                right += 1;
            } else if index_a < index_b {
                left += 1;
            } else {
                right += 1;
            }
        }
        total
    }
}
