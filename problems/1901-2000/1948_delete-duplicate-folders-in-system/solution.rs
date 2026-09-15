use std::collections::{BTreeMap, HashMap};

impl Solution {
    pub fn delete_duplicate_folder(paths: Vec<Vec<String>>) -> Vec<Vec<String>> {
        // trie nodes: children maps name -> node id; node 0 is the root
        let mut children: Vec<BTreeMap<String, usize>> = vec![BTreeMap::new()];
        for path in &paths {
            let mut node = 0usize;
            for name in path {
                if let Some(&next) = children[node].get(name) {
                    node = next;
                } else {
                    let next = children.len();
                    children.push(BTreeMap::new());
                    children[node].insert(name.clone(), next);
                    node = next;
                }
            }
        }
        let total = children.len();

        // collect all nodes (parents always appear before their children)
        let mut nodes: Vec<usize> = Vec::with_capacity(total);
        let mut stack: Vec<usize> = vec![0];
        while let Some(u) = stack.pop() {
            nodes.push(u);
            for &child in children[u].values() {
                stack.push(child);
            }
        }

        // assign subtree signature ids in post-order (children before parents)
        let mut sig_to_id: HashMap<String, usize> = HashMap::new();
        let mut sig_counts: HashMap<usize, usize> = HashMap::new();
        let mut node_sig = vec![0usize; total];
        for &node in nodes.iter().rev() {
            let mut key = String::new();
            for (name, &child) in &children[node] {
                key.push_str(name);
                key.push('\u{1}');
                key.push_str(&node_sig[child].to_string());
                key.push('\u{2}');
            }
            let sid = match sig_to_id.get(&key) {
                Some(&sid) => sid,
                None => {
                    let sid = sig_to_id.len();
                    sig_to_id.insert(key, sid);
                    sid
                }
            };
            node_sig[node] = sid;
            *sig_counts.entry(sid).or_insert(0) += 1;
        }

        let mut marked = vec![false; total];
        for &node in &nodes {
            if !children[node].is_empty() && sig_counts.get(&node_sig[node]).copied().unwrap_or(0) >= 2 {
                let mut mark_stack = vec![node];
                while let Some(cur) = mark_stack.pop() {
                    marked[cur] = true;
                    for &child in children[cur].values() {
                        mark_stack.push(child);
                    }
                }
            }
        }

        let mut result: Vec<Vec<String>> = Vec::new();
        let mut collect_stack: Vec<(usize, Vec<String>)> = vec![(0, Vec::new())];
        while let Some((u, prefix)) = collect_stack.pop() {
            for (name, &child) in &children[u] {
                if marked[child] {
                    continue;
                }
                let mut new_path = prefix.clone();
                new_path.push(name.clone());
                result.push(new_path.clone());
                collect_stack.push((child, new_path));
            }
        }
        result.sort();
        result
    }
}
