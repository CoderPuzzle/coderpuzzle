struct TrieNode {
    children: [Option<Box<TrieNode>>; 26],
    word: Option<String>,
    top: Vec<String>,
}

impl TrieNode {
    fn new() -> Self {
        TrieNode {
            children: Default::default(),
            word: None,
            top: Vec::new(),
        }
    }
}

// Merge phase, children before parents: a node's best three are its own word
// first (a prefix of every other word through it, hence the smallest), then
// the children's lists in letter order. Every child merges unconditionally —
// search consults `top` at nodes the root's own gathering never needed.
fn merge_top(node: &mut TrieNode) {
    // every child is merged unconditionally: search reads `top` at every
    // depth, so a subtree left unmerged would read back empty
    let mut top: Vec<String> = node.word.clone().into_iter().collect();
    for slot in 0..26 {
        if let Some(child) = node.children[slot].as_mut() {
            merge_top(child);
            for word in child.top.iter() {
                if top.len() >= 3 {
                    break;
                }
                top.push(word.clone());
            }
        }
    }
    node.top = top;
}

impl Solution {
    pub fn suggested_products(products: Vec<String>, searchWord: String) -> Vec<Vec<String>> {
        // spell every word down the tree; nodes appear only where needed
        let mut root = TrieNode::new();
        for word in products {
            let mut node = &mut root;
            for letter in word.bytes() {
                let slot = (letter - b'a') as usize;
                if node.children[slot].is_none() {
                    node.children[slot] = Some(Box::new(TrieNode::new()));
                }
                node = node.children[slot].as_mut().unwrap();
            }
            node.word = Some(word);
        }
        merge_top(&mut root);

        // a keystroke is one pointer move; once a slot is empty it stays
        // empty, because prefixes only ever grow
        let mut result: Vec<Vec<String>> = Vec::new();
        let mut node: Option<&TrieNode> = Some(&root);
        for letter in searchWord.bytes() {
            if let Some(current) = node {
                node = current.children[(letter - b'a') as usize].as_deref();
            }
            match node {
                Some(current) => result.push(current.top.clone()),
                None => result.push(Vec::new()),
            }
        }
        result
    }
}
