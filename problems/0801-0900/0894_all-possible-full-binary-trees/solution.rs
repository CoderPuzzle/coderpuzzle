// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

use std::collections::HashMap;

impl Solution {
    pub fn all_possible_fbt(n: i32) -> Vec<Option<Box<TreeNode>>> {
        // A full tree's node count is odd: the root alone is 1, and every
        // internal node adds a pair. An even n therefore admits no tree.
        if n % 2 == 0 {
            return Vec::new();
        }
        Self::build(n as usize, &mut HashMap::new())
    }

    // The recursion steps count down by 2, so it nests at most
    // n / 2 + 1 frames deep — 11 at the constraint's n = 20.
    fn build(count: usize, memo: &mut HashMap<usize, Vec<Option<Box<TreeNode>>>>) -> Vec<Option<Box<TreeNode>>> {
        if count == 1 {
            return vec![Some(Box::new(TreeNode::new(0)))];
        }
        if let Some(trees) = memo.get(&count) {
            return trees.clone();
        }
        // The root is fixed; a tree of `count` nodes is a choice of left
        // shape times right shape over every odd split of count - 1 —
        // left sizes ascending, left shapes outermost, exactly the order
        // the statement pins. Ownership forces each emitted tree to own
        // its subtrees, so shared shapes are cloned in — TreeNode derives
        // Clone, and the copy preserves the pinned order untouched.
        let mut trees: Vec<Option<Box<TreeNode>>> = Vec::new();
        for left_count in (1..count - 1).step_by(2) {
            let lefts = Self::build(left_count, memo);
            let rights = Self::build(count - 1 - left_count, memo);
            for left in &lefts {
                for right in &rights {
                    trees.push(Some(Box::new(TreeNode {
                        val: 0,
                        left: left.clone(),
                        right: right.clone(),
                    })));
                }
            }
        }
        memo.insert(count, trees.clone());
        trees
    }
}
