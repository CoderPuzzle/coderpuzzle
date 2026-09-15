use std::collections::HashMap;

impl Solution {
    fn key(node: &TreeNode) -> usize {
        // A node's address identifies it in the memo tables; Box guarantees
        // a stable address for the tree's lifetime.
        node as *const TreeNode as usize
    }

    fn take<'a>(
        node: Option<&'a TreeNode>,
        take_map: &mut HashMap<usize, i32>,
        skip_map: &mut HashMap<usize, i32>,
    ) -> i32 {
        let node = match node {
            Some(node) => node,
            None => return 0,
        };
        if let Some(&cached) = take_map.get(&Self::key(node)) {
            return cached;
        }
        // Taking this node bars both children outright.
        let best = node.val
            + Self::skip(node.left.as_deref(), take_map, skip_map)
            + Self::skip(node.right.as_deref(), take_map, skip_map);
        take_map.insert(Self::key(node), best);
        best
    }

    fn skip<'a>(
        node: Option<&'a TreeNode>,
        take_map: &mut HashMap<usize, i32>,
        skip_map: &mut HashMap<usize, i32>,
    ) -> i32 {
        let node = match node {
            Some(node) => node,
            None => return 0,
        };
        if let Some(&cached) = skip_map.get(&Self::key(node)) {
            return cached;
        }
        // Each child keeps its better option.
        let best = Self::take(node.left.as_deref(), take_map, skip_map).max(Self::skip(
            node.left.as_deref(),
            take_map,
            skip_map,
        )) + Self::take(node.right.as_deref(), take_map, skip_map).max(Self::skip(
            node.right.as_deref(),
            take_map,
            skip_map,
        ));
        skip_map.insert(Self::key(node), best);
        best
    }

    pub fn rob(root: Option<Box<TreeNode>>) -> i32 {
        // Two independent questions per subtree, each with its own memo
        // table: the best with the root chosen, and the best with the root
        // barred. Asking them separately can re-descend a subtree, but the
        // tables make sure each question is settled once per node.
        let mut take_map: HashMap<usize, i32> = HashMap::new();
        let mut skip_map: HashMap<usize, i32> = HashMap::new();
        Self::take(root.as_deref(), &mut take_map, &mut skip_map).max(Self::skip(
            root.as_deref(),
            &mut take_map,
            &mut skip_map,
        ))
    }
}
