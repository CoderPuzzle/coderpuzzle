// Disjoint-set union with path compression and union-by-merge: two
// independent copies track what Alice and Bob can each reach, but every
// Type 3 edge is unioned into both copies at once, since it serves both
// of them for free.
struct EdgeDisjointSet {
    parent: Vec<usize>,
    components: i32,
}

impl EdgeDisjointSet {
    fn new(size: usize) -> Self {
        EdgeDisjointSet {
            parent: (0..=size).collect(),
            components: size as i32,
        }
    }

    fn find(&mut self, node: usize) -> usize {
        let mut node = node;
        while self.parent[node] != node {
            self.parent[node] = self.parent[self.parent[node]];
            node = self.parent[node];
        }
        node
    }

    fn union(&mut self, a: usize, b: usize) -> bool {
        let (root_a, root_b) = (self.find(a), self.find(b));
        if root_a == root_b {
            return false;
        }
        self.parent[root_a] = root_b;
        self.components -= 1;
        true
    }
}

impl Solution {
    pub fn max_num_edges_to_remove(n: i32, edges: Vec<Vec<i32>>) -> i32 {
        let mut alice = EdgeDisjointSet::new(n as usize);
        let mut bob = EdgeDisjointSet::new(n as usize);
        let mut used = 0;

        // Type 3 edges go first: whichever ones actually merge two
        // components help both Alice and Bob simultaneously, so they are
        // never worse than spending a Type 1 and a Type 2 edge instead.
        for edge in &edges {
            if edge[0] == 3 {
                let (u, v) = (edge[1] as usize, edge[2] as usize);
                let merged_alice = alice.union(u, v);
                let merged_bob = bob.union(u, v);
                if merged_alice || merged_bob {
                    used += 1;
                }
            }
        }

        // Type 1 (Alice-only) and Type 2 (Bob-only) edges fill in whatever
        // the shared edges left disconnected, each within its own copy.
        for edge in &edges {
            let (u, v) = (edge[1] as usize, edge[2] as usize);
            if edge[0] == 1 {
                if alice.union(u, v) {
                    used += 1;
                }
            } else if edge[0] == 2 {
                if bob.union(u, v) {
                    used += 1;
                }
            }
        }

        if alice.components != 1 || bob.components != 1 {
            return -1;
        }
        edges.len() as i32 - used
    }
}
