use std::collections::HashMap;

// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn get_directions(root: Option<Box<TreeNode>>, startValue: i32, destValue: i32) -> String {
        let root = root.unwrap();
        let mut parent: HashMap<i32, i32> = HashMap::new();
        let mut incoming: HashMap<i32, char> = HashMap::new();
        parent.insert(root.val, 0);
        let mut stack = vec![root];
        while let Some(mut node) = stack.pop() {
            if let Some(left) = node.left.take() {
                parent.insert(left.val, node.val);
                incoming.insert(left.val, 'L');
                stack.push(left);
            }
            if let Some(right) = node.right.take() {
                parent.insert(right.val, node.val);
                incoming.insert(right.val, 'R');
                stack.push(right);
            }
        }

        let mut distance: HashMap<i32, usize> = HashMap::new();
        let mut node = startValue;
        let mut steps = 0;
        while node != 0 {
            distance.insert(node, steps);
            steps += 1;
            node = parent[&node];
        }

        let mut downward = Vec::new();
        node = destValue;
        while !distance.contains_key(&node) {
            downward.push(incoming[&node]);
            node = parent[&node];
        }
        downward.reverse();
        "U".repeat(distance[&node]) + &downward.into_iter().collect::<String>()
    }
}
