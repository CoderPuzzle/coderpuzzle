use std::collections::HashMap;

impl Solution {
    pub fn find_redundant_connection(edges: Vec<Vec<i32>>) -> Vec<i32> {
        let mut parent: HashMap<i32, i32> = HashMap::new();

        fn find(parent: &mut HashMap<i32, i32>, node: i32) -> i32 {
            let mut root = node;
            while parent[&root] != root {
                root = parent[&root];
            }
            // Second walk repoints every visited node at the root (path
            // compression), flattening the structure for later finds.
            let mut node = node;
            while parent[&node] != root {
                let next = parent[&node];
                parent.insert(node, root);
                node = next;
            }
            root
        }

        // A tree plus one extra edge has exactly one cycle; the first edge
        // whose endpoints already share a root is the one that closes it.
        for edge in &edges {
            let (a, b) = (edge[0], edge[1]);
            // Unseen nodes register lazily on first touch.
            parent.entry(a).or_insert(a);
            parent.entry(b).or_insert(b);
            let ra = find(&mut parent, a);
            let rb = find(&mut parent, b);
            if ra == rb {
                return vec![a, b];
            }
            parent.insert(ra, rb);
        }
        Vec::new()
    }
}
