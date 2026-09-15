// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    // The tree is a formula: leaves hold the literals (1 is true, 0 is
    // false) and internal nodes apply their operator — 2 ORs the two
    // child bits, 3 ANDs them — so the answer is a post-order fold.
    // Spines of this tree can run hundreds of nodes deep, so the fold
    // runs on explicit stacks instead of the call stack: entries say
    // either "expand this node" or "apply this operator". Expanding an
    // internal node parks its operator beneath its children, left on
    // top; because the tree is full, each subtree's entries net out to
    // exactly one bit, so an operator resurfaces only after its two
    // operands sit ready on the operand shelf.
    pub fn evaluate_tree(root: Option<Box<TreeNode>>) -> bool {
        let root = match root.as_deref() {
            Some(node) => node,
            None => return false,
        };
        enum Entry<'a> {
            Expand(&'a TreeNode),
            Apply(bool),
        }
        let mut operands: Vec<bool> = Vec::new();
        let mut work: Vec<Entry> = vec![Entry::Expand(root)];
        while let Some(entry) = work.pop() {
            match entry {
                Entry::Expand(node) => match (node.left.as_deref(), node.right.as_deref()) {
                    (Some(left), Some(right)) => {
                        work.push(Entry::Apply(node.val == 2));
                        work.push(Entry::Expand(right));
                        work.push(Entry::Expand(left));
                    }
                    _ => operands.push(node.val == 1),
                },
                Entry::Apply(is_or) => {
                    let right = operands.pop().unwrap();
                    let left = operands.pop().unwrap();
                    operands.push(if is_or { left || right } else { left && right });
                }
            }
        }
        operands.pop().unwrap()
    }
}
