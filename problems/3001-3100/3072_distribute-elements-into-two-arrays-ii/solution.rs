impl Solution {
    fn bit_add(tree: &mut [i32], mut i: usize, delta: i32) {
        let n = tree.len() - 1;
        while i <= n {
            tree[i] += delta;
            i += i & i.wrapping_neg();
        }
    }

    fn bit_query(tree: &[i32], mut i: usize) -> i32 {
        let mut s = 0;
        while i > 0 {
            s += tree[i];
            i -= i & i.wrapping_neg();
        }
        s
    }

    pub fn result_array(nums: Vec<i32>) -> Vec<i32> {
        // Compress distinct values to 1-based ranks for the two Fenwick trees.
        let mut vals = nums.clone();
        vals.sort_unstable();
        vals.dedup();
        let size = vals.len();
        let mut comp = std::collections::HashMap::new();
        for (i, &v) in vals.iter().enumerate() {
            comp.insert(v, i + 1);
        }
        let mut tree1 = vec![0i32; size + 1];
        let mut tree2 = vec![0i32; size + 1];

        // Seed both arrays and their trees with the first two elements.
        let mut arr1: Vec<i32> = vec![nums[0]];
        let mut arr2: Vec<i32> = vec![nums[1]];
        Self::bit_add(&mut tree1, comp[&nums[0]], 1);
        Self::bit_add(&mut tree2, comp[&nums[1]], 1);

        for &x in &nums[2..] {
            // greaterCount = size - prefix count of ranks <= rank(x).
            let c1 = arr1.len() as i32 - Self::bit_query(&tree1, comp[&x]);
            let c2 = arr2.len() as i32 - Self::bit_query(&tree2, comp[&x]);
            if c1 > c2 {
                arr1.push(x);
                Self::bit_add(&mut tree1, comp[&x], 1);
            } else if c1 < c2 {
                arr2.push(x);
                Self::bit_add(&mut tree2, comp[&x], 1);
            } else {
                // Equal counts: shorter array wins; ties on length go to arr1.
                if arr1.len() <= arr2.len() {
                    arr1.push(x);
                    Self::bit_add(&mut tree1, comp[&x], 1);
                } else {
                    arr2.push(x);
                    Self::bit_add(&mut tree2, comp[&x], 1);
                }
            }
        }
        arr1.extend_from_slice(&arr2);
        arr1
    }
}
