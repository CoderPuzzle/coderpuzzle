// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    // Rerooting is a walk, not a rebuild: the rule names, for every node
    // on the leaf-to-root path, exactly which pointers move. The tree
    // arrives owned, so it is flattened once into an index arena — each
    // cell holding a value and left/right/parent indices, the parent
    // index being the pointer the statement demands, kept in the
    // solver's own arena. Values are unique, so the cell carrying the
    // leaf's value is the leaf itself.
    pub fn flip_binary_tree(root: Option<Box<TreeNode>>, leaf: i32) -> Option<Box<TreeNode>> {
        struct Cell {
            val: i32,
            left: Option<usize>,
            right: Option<usize>,
            parent: Option<usize>,
        }
        // (boxed node, parent cell, side) — LIFO, so each child records
        // itself into its parent's slot as its cell is created.
        let mut work: Vec<(Option<Box<TreeNode>>, Option<usize>, bool)> = vec![(root, None, false)];
        let mut cells: Vec<Cell> = Vec::new();
        let mut leaf_at = 0usize;
        while let Some((boxed, parent, right_side)) = work.pop() {
            if let Some(mut node) = boxed {
                let at = cells.len();
                cells.push(Cell {
                    val: node.val,
                    left: None,
                    right: None,
                    parent,
                });
                if let Some(p) = parent {
                    if right_side {
                        cells[p].right = Some(at);
                    } else {
                        cells[p].left = Some(at);
                    }
                }
                if node.val == leaf {
                    leaf_at = at;
                }
                let left = node.left.take();
                let right = node.right.take();
                if right.is_some() {
                    work.push((right, Some(at), true));
                }
                if left.is_some() {
                    work.push((left, Some(at), false));
                }
            }
        }
        // The two steps are applied bottom-up on the arena, stopping
        // before the root: clear the parent's downward pointer (emptying
        // the slot the moved subtree needs), move a surviving left child
        // across to the right, and attach the parent as the new left
        // child.
        let mut cur = leaf_at;
        while let Some(above) = cells[cur].parent {
            if cells[above].left == Some(cur) {
                cells[above].left = None;
            } else if cells[above].right == Some(cur) {
                cells[above].right = None;
            }
            if let Some(left) = cells[cur].left.take() {
                cells[cur].right = Some(left);
            }
            cells[cur].left = Some(above);
            cur = above;
        }
        // Reassemble the re-hung arena into owned boxes, children first,
        // from the leaf — the walk's starting point is the new root.
        let vals: Vec<i32> = cells.iter().map(|cell| cell.val).collect();
        let links: Vec<(Option<usize>, Option<usize>)> = cells.iter().map(|cell| (cell.left, cell.right)).collect();
        let mut built: Vec<Option<Box<TreeNode>>> = (0..vals.len()).map(|_| None).collect();
        let mut stack: Vec<(usize, bool)> = vec![(leaf_at, false)];
        while let Some((at, expanded)) = stack.pop() {
            if expanded {
                let mut node = Box::new(TreeNode {
                    val: vals[at],
                    left: None,
                    right: None,
                });
                if let Some(left) = links[at].0 {
                    node.left = built[left].take();
                }
                if let Some(right) = links[at].1 {
                    node.right = built[right].take();
                }
                built[at] = Some(node);
            } else {
                stack.push((at, true));
                if let Some(right) = links[at].1 {
                    stack.push((right, false));
                }
                if let Some(left) = links[at].0 {
                    stack.push((left, false));
                }
            }
        }
        built[leaf_at].take()
    }
}
