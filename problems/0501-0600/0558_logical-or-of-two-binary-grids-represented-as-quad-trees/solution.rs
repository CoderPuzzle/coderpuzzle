impl Solution {
    pub fn intersect(quad_tree1: Option<Box<QuadNode>>, quad_tree2: Option<Box<QuadNode>>) -> Option<Box<QuadNode>> {
        Self::merge(quad_tree1, quad_tree2)
    }

    fn merge(first: Option<Box<QuadNode>>, second: Option<Box<QuadNode>>) -> Option<Box<QuadNode>> {
        let first = first.unwrap();
        let second = second.unwrap();
        if first.is_leaf {
            return if first.val { Some(first) } else { Some(second) };
        }
        if second.is_leaf {
            return if second.val { Some(second) } else { Some(first) };
        }
        let top_left = Self::merge(first.top_left, second.top_left);
        let top_right = Self::merge(first.top_right, second.top_right);
        let bottom_left = Self::merge(first.bottom_left, second.bottom_left);
        let bottom_right = Self::merge(first.bottom_right, second.bottom_right);
        let kids = [&top_left, &top_right, &bottom_left, &bottom_right];
        let uniform = kids.iter().all(|kid| match kid {
            Some(node) => node.is_leaf && node.val == kids[0].as_ref().unwrap().val,
            None => false,
        });
        if uniform {
            return Some(Box::new(QuadNode::new(kids[0].as_ref().unwrap().val, true)));
        }
        let mut node = Box::new(QuadNode::new(false, false));
        node.top_left = top_left;
        node.top_right = top_right;
        node.bottom_left = bottom_left;
        node.bottom_right = bottom_right;
        Some(node)
    }
}
