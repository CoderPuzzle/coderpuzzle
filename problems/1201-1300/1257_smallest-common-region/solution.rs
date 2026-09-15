use std::collections::{HashMap, HashSet};

impl Solution {
    pub fn find_smallest_region(regions: Vec<Vec<String>>, region1: String, region2: String) -> String {
        let mut parent: HashMap<&str, &str> = HashMap::new();
        for group in &regions {
            for child in &group[1..] {
                parent.insert(child.as_str(), group[0].as_str());
            }
        }
        // Ancestor chain of region1, itself included.
        let mut chain: HashSet<&str> = HashSet::new();
        let mut node: &str = region1.as_str();
        loop {
            chain.insert(node);
            match parent.get(node) {
                Some(&up) => node = up,
                None => break,
            }
        }
        // First ancestor of region2 inside that chain is the LCA.
        let mut node: &str = region2.as_str();
        while !chain.contains(node) {
            node = parent[node];
        }
        node.to_string()
    }
}
