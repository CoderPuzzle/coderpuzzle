use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn height_of_tree(root: Option<Rc<RefCell<RingTreeNode>>>) -> i32 {
        let Some(root) = root else { return 0 };
        // A leaf of the special tree is the one node the display cannot
        // mark: the ring gives every leaf both children, and the previous
        // leaf's right child points back at the leaf itself. A wave only
        // descends from the nodes the test clears, so the ring never
        // joins a wave and every reached node is visited once.
        let mut frontier = vec![root];
        let mut height = 0;
        loop {
            let mut wave: Vec<Rc<RefCell<RingTreeNode>>> = Vec::new();
            for node in &frontier {
                let left = node.borrow().left.clone();
                let right = node.borrow().right.clone();
                if let Some(left) = &left {
                    if matches!(
                        left.borrow().right.as_ref(),
                        Some(back) if Rc::ptr_eq(back, node)
                    ) {
                        continue;
                    }
                }
                if let Some(left) = left {
                    wave.push(left);
                }
                if let Some(right) = right {
                    wave.push(right);
                }
            }
            if wave.is_empty() {
                return height;
            }
            height += 1;
            frontier = wave;
        }
    }
}
