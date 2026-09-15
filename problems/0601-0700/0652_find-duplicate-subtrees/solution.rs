use std::collections::HashMap;

struct Entry {
    node: Option<Box<TreeNode>>,
    last_index: i32,
    count: i32,
}

fn visit(
    node: Option<Box<TreeNode>>,
    counter: &mut i32,
    info: &mut HashMap<String, Entry>,
) -> (String, Option<Box<TreeNode>>) {
    match node {
        None => ("#".to_string(), None),
        Some(boxed) => {
            let mut n = *boxed;
            let index = *counter;
            *counter += 1;
            let (left_serial, left_node) = visit(n.left.take(), counter, info);
            let (right_serial, right_node) = visit(n.right.take(), counter, info);
            n.left = left_node;
            n.right = right_node;
            let serial = format!("{},{},{}", n.val, left_serial, right_serial);
            let whole = Box::new(n);
            match info.get_mut(&serial) {
                Some(entry) => {
                    entry.last_index = index;
                    entry.count += 1;
                }
                None => {
                    // store a copy; the original stays intact for the parent subtree
                    info.insert(
                        serial.clone(),
                        Entry {
                            node: Some(whole.clone()),
                            last_index: index,
                            count: 1,
                        },
                    );
                }
            }
            (serial, Some(whole))
        }
    }
}

impl Solution {
    pub fn find_duplicate_subtrees(root: Option<Box<TreeNode>>) -> Vec<Option<Box<TreeNode>>> {
        let mut info: HashMap<String, Entry> = HashMap::new();
        let mut counter: i32 = 0;
        visit(root, &mut counter, &mut info);
        let mut entries: Vec<Entry> = info.into_values().collect();
        entries.sort_by_key(|e| e.last_index);
        entries.into_iter().filter(|e| e.count >= 2).map(|e| e.node).collect()
    }
}
