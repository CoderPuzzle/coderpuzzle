use std::collections::HashMap;

impl Solution {
    pub fn build_tree(preorder: Vec<i32>, inorder: Vec<i32>) -> Option<Box<TreeNode>> {
        // Value -> inorder index: makes each split lookup O(1) instead of a
        // linear scan. Values are unique, so a hit is exactly one split point.
        let mut index: HashMap<i32, usize> = HashMap::new();
        for (i, &v) in inorder.iter().enumerate() {
            index.insert(v, i);
        }
        // Single shared cursor consuming preorder strictly left to right,
        // one value per recursive call (passed as &mut).
        let mut position = 0usize;
        Solution::build(&preorder, &index, &mut position, 0, inorder.len())
    }

    fn build(
        preorder: &[i32],
        index: &HashMap<i32, usize>,
        position: &mut usize,
        low: usize,
        high: usize,
    ) -> Option<Box<TreeNode>> {
        // Empty inorder range <=> missing child, so base cases need no
        // special casing.
        if low >= high {
            return None;
        }
        // The first unconsumed preorder value is the root of this subtree:
        // preorder lists root, then the whole left subtree, then the right
        // -- exactly the order the recursion asks for root values.
        let value = preorder[*position];
        *position += 1;
        let mid = index[&value];
        // Inorder visits left, root, right: [low, mid) is the left
        // subtree and [mid + 1, high) the right.
        let left = Solution::build(preorder, index, position, low, mid);
        let right = Solution::build(preorder, index, position, mid + 1, high);
        Some(Box::new(TreeNode {
            val: value,
            left,
            right,
        }))
    }
}
