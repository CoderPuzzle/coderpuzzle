// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

use std::collections::VecDeque;

impl Solution {
    pub fn correct_binary_tree(root: Option<Box<TreeNode>>, fromNode: i32, toNode: i32) -> Option<Box<TreeNode>> {
        // The tree arrives clean — the defect exists only after the
        // custom-testing step — so the fix rebuilds it: wire the fromNode
        // node's empty right slot to the toNode node, then a breadth-first
        // sweep that takes each level right to left, marking nodes seen on
        // enqueue and carrying each node's parent alongside it. toNode sits
        // right of fromNode on the same depth, so by the time fromNode is
        // dequeued its right child is already seen — and no other node can
        // pass that test, because in a tree every child is enqueued exactly
        // once, by its own parent; only the wired edge breaks that.
        //
        // The wire gives one node two parents, a shape Box ownership cannot
        // hold, so the sweep runs on an arena: nodes become indices, the
        // wire is a second index written into fromNode's right slot, and a
        // seen array stands in for the set. Children always land at higher
        // indices than their parent, which is what lets the arena fold back
        // into owned boxes in one reverse sweep afterwards.
        struct Slot {
            val: i32,
            left: Option<usize>,
            right: Option<usize>,
        }
        let mut arena: Vec<Slot> = Vec::new();
        let boxed = match root {
            Some(boxed) => boxed,
            None => return None,
        };
        arena.push(Slot {
            val: boxed.val,
            left: None,
            right: None,
        });
        let mut work: Vec<(usize, Box<TreeNode>)> = vec![(0, boxed)];
        while let Some((index, mut node)) = work.pop() {
            if let Some(child) = node.left.take() {
                arena.push(Slot {
                    val: child.val,
                    left: None,
                    right: None,
                });
                let child_index = arena.len() - 1;
                arena[index].left = Some(child_index);
                work.push((child_index, child));
            }
            if let Some(child) = node.right.take() {
                arena.push(Slot {
                    val: child.val,
                    left: None,
                    right: None,
                });
                let child_index = arena.len() - 1;
                arena[index].right = Some(child_index);
                work.push((child_index, child));
            }
        }
        let mut from_index = None;
        let mut to_index = None;
        for (index, slot) in arena.iter().enumerate() {
            if slot.val == fromNode {
                from_index = Some(index);
            } else if slot.val == toNode {
                to_index = Some(index);
            }
        }
        arena[from_index.unwrap()].right = to_index;
        let mut seen = vec![false; arena.len()];
        seen[0] = true;
        let mut pending: VecDeque<(usize, Option<usize>)> = VecDeque::new();
        pending.push_back((0, None));
        let mut detached = None;
        while let Some((index, parent)) = pending.pop_front() {
            if let Some(right) = arena[index].right {
                if seen[right] {
                    // detach the offender through the parent beside it
                    let parent = parent.expect("the invalid node sits below the root");
                    if arena[parent].left == Some(index) {
                        arena[parent].left = None;
                    } else {
                        arena[parent].right = None;
                    }
                    detached = Some(index);
                    break;
                }
                seen[right] = true;
                pending.push_back((right, Some(index)));
            }
            if let Some(left) = arena[index].left {
                seen[left] = true;
                pending.push_back((left, Some(index)));
            }
        }
        // Fold the arena back into owned boxes: a reverse sweep takes each
        // surviving subtree out of its cell; the detached node's cell is
        // skipped, so nothing below it moves — and the node it pointed at
        // stays with its original parent, which is the whole correction.
        let links: Vec<(Option<usize>, Option<usize>)> = arena.iter().map(|slot| (slot.left, slot.right)).collect();
        let mut cells: Vec<Option<Box<TreeNode>>> = arena
            .into_iter()
            .map(|slot| {
                Some(Box::new(TreeNode {
                    val: slot.val,
                    left: None,
                    right: None,
                }))
            })
            .collect();
        for index in (0..cells.len()).rev() {
            if Some(index) == detached {
                continue;
            }
            let (left, right) = links[index];
            let mut node = cells[index].take().unwrap();
            if let Some(child) = left {
                node.left = cells[child].take();
            }
            if let Some(child) = right {
                node.right = cells[child].take();
            }
            cells[index] = Some(node);
        }
        cells[0].take()
    }
}
