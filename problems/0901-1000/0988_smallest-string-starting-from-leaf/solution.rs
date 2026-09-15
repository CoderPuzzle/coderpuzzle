// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn smallest_from_leaf(root: Option<Box<TreeNode>>) -> String {
        // Every root-to-leaf path, read backwards, is one candidate, and
        // the answer is the smallest of them — plain lexicographic order,
        // in which a strict prefix counts as smaller ("ab" < "aba"). One
        // shared path buffer holds a character per active root->node
        // frame: descending appends, unwinding pops, so no frame ever
        // carries a copy of its parent's path, and the buffer is reversed
        // into a candidate only at a leaf. Candidates are compared as raw
        // byte vectors — vector ordering is lexicographic with a strict
        // prefix smaller, and for these ASCII letters byte order is
        // letter order, exactly the statement's rule.
        // Iterative on purpose: the 8500-node chain the constraints allow
        // is far deeper than the judge's runtimes may recurse; the
        // explicit stack is one entry per node or unwind marker and never
        // nests a call.
        enum Item<'a> {
            Descend(&'a TreeNode),
            Unwind,
        }
        let mut best: Option<Vec<u8>> = None;
        // The path buffer holds one character per active frame, root -> node.
        let mut path: Vec<u8> = Vec::new();
        let mut pending: Vec<Item> = Vec::new();
        if let Some(node) = root.as_deref() {
            pending.push(Item::Descend(node));
        }
        while let Some(item) = pending.pop() {
            match item {
                Item::Unwind => {
                    path.pop();
                }
                Item::Descend(node) => {
                    path.push(b'a' + node.val as u8);
                    if node.left.is_none() && node.right.is_none() {
                        let candidate: Vec<u8> = path.iter().rev().copied().collect();
                        if best.as_deref().map_or(true, |b| candidate.as_slice() < b) {
                            best = Some(candidate);
                        }
                        path.pop(); // a leaf unwinds its own character
                    } else {
                        pending.push(Item::Unwind); // unwinds once both subtrees finish
                        if let Some(child) = node.right.as_deref() {
                            pending.push(Item::Descend(child));
                        }
                        if let Some(child) = node.left.as_deref() {
                            pending.push(Item::Descend(child));
                        }
                    }
                }
            }
        }
        String::from_utf8(best.unwrap_or_default()).unwrap()
    }
}
