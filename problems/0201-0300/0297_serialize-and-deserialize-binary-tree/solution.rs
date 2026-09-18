pub struct Codec;

impl Codec {
    pub fn new() -> Self {
        Codec
    }

    // Level-order codec with explicit null markers. The format is this
    // solution's own choice — the judge only requires that
    // deserialize(serialize(root)) rebuilds the same tree. Both directions
    // are iterative, so deep trees are safe.
    pub fn serialize(&mut self, root: Option<Box<TreeNode>>) -> String {
        let mut tokens: Vec<String> = Vec::new();
        // The queue holds None too: it emits a marker and enqueues nothing,
        // so every child slot gets exactly one token.
        let mut queue: Vec<Option<Box<TreeNode>>> = vec![root];
        let mut head = 0;
        while head < queue.len() {
            match queue[head].take() {
                None => tokens.push("#".to_string()),
                Some(node) => {
                    tokens.push(node.val.to_string());
                    queue.push(node.left);
                    queue.push(node.right);
                }
            }
            head += 1;
        }
        // Trailing markers only mark absent slots, so trimming them keeps
        // the sequence uniquely recoverable.
        while tokens.last().map(|token| token == "#").unwrap_or(false) {
            tokens.pop();
        }
        tokens.join(",")
    }

    pub fn deserialize(&mut self, data: String) -> Option<Box<TreeNode>> {
        if data.is_empty() {
            return None;
        }
        let tokens: Vec<&str> = data.split(',').collect();
        // Arena pass: values and child indices in level order, so the tree
        // can be materialized bottom-up without recursion.
        let mut values: Vec<i32> = vec![tokens[0].parse().unwrap()];
        let mut lefts: Vec<Option<usize>> = vec![None];
        let mut rights: Vec<Option<usize>> = vec![None];
        let mut parents: Vec<usize> = vec![0];
        let mut index = 1;
        let mut head = 0;
        // Consume tokens as child slots in queue order; a marker fills the
        // slot without adding a node to the queue.
        while head < parents.len() && index < tokens.len() {
            let parent = parents[head];
            head += 1;
            for slot in 0..2 {
                if index >= tokens.len() {
                    break;
                }
                let token = tokens[index];
                index += 1;
                if token == "#" {
                    continue;
                }
                let child = values.len();
                values.push(token.parse().unwrap());
                lefts.push(None);
                rights.push(None);
                if slot == 0 {
                    lefts[parent] = Some(child);
                } else {
                    rights[parent] = Some(child);
                }
                parents.push(child);
            }
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
