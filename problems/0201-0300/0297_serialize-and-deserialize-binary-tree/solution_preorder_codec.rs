pub struct Codec;

impl Codec {
    pub fn new() -> Self {
        Codec
    }

    // Preorder codec with explicit null markers. The format is this
    // solution's own choice — the judge only requires that
    // deserialize(serialize(root)) rebuilds the same tree. Both directions
    // are iterative, so deep trees are safe.
    pub fn serialize(&mut self, root: Option<Box<TreeNode>>) -> String {
        let mut tokens: Vec<String> = Vec::new();
        // Preorder with an explicit stack: pop a node, emit its value, then
        // push right before left so the left subtree is written first.
        let mut stack: Vec<Option<Box<TreeNode>>> = vec![root];
        while let Some(current) = stack.pop() {
            match current {
                None => tokens.push("#".to_string()),
                Some(node) => {
                    tokens.push(node.val.to_string());
                    stack.push(node.right);
                    stack.push(node.left);
                }
            }
        }
        // Closing markers tell the replay when a subtree ends, so unlike the
        // breadth-first form nothing here can be trimmed.
        tokens.join(",")
    }

    pub fn deserialize(&mut self, data: String) -> Option<Box<TreeNode>> {
        let tokens: Vec<&str> = data.split(',').collect();
        if tokens[0] == "#" {
            return None;
        }
        // Arena pass: values and child indices in preorder, so the tree can
        // be materialized bottom-up without recursion.
        let mut values: Vec<i32> = vec![tokens[0].parse().unwrap()];
        let mut lefts: Vec<Option<usize>> = vec![None];
        let mut rights: Vec<Option<usize>> = vec![None];
        // Open child slots replay preorder: the top slot takes the next
        // token, a marker fills it with nothing, a value makes a node that
        // fills it and opens two slots of its own (right before left).
        let mut pending: Vec<(usize, bool)> = vec![(0, true), (0, false)];
        let mut index = 1;
        while let Some((parent, right)) = pending.pop() {
            let token = tokens[index];
            index += 1;
            if token == "#" {
                continue;
            }
            let child = values.len();
            values.push(token.parse().unwrap());
            lefts.push(None);
            rights.push(None);
            if right {
                rights[parent] = Some(child);
            } else {
                lefts[parent] = Some(child);
            }
            pending.push((child, true));
            pending.push((child, false));
        }
        // Children always have larger arena indices than their parent, so a
        // reverse sweep builds every subtree before it is attached.
        let mut built: Vec<Option<Box<TreeNode>>> = (0..values.len()).map(|_| None).collect();
        for node in (0..values.len()).rev() {
            let mut created = Box::new(TreeNode::new(values[node]));
            created.left = lefts[node].map(|child| built[child].take().unwrap());
            created.right = rights[node].map(|child| built[child].take().unwrap());
            built[node] = Some(created);
        }
        built[0].take()
    }
}
