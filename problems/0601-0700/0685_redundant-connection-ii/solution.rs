impl Solution {
    pub fn find_redundant_directed_connection(edges: Vec<Vec<i32>>) -> Vec<i32> {
        // First pass: a node with two parents names the two candidate edges, in input order.
        let n = edges.len();
        let mut parent_edge = vec![usize::MAX; n + 1];
        let (mut cand1, mut cand2) = (usize::MAX, usize::MAX);
        for (i, edge) in edges.iter().enumerate() {
            let v = edge[1] as usize;
            if parent_edge[v] != usize::MAX {
                cand1 = parent_edge[v];
                cand2 = i;
            } else {
                parent_edge[v] = i;
            }
        }

        let mut dsu: Vec<usize> = (0..=n).collect();

        // Second pass over every edge except the later candidate: a cycle means dropping it
        // is not enough, so the earlier edge is the answer; a clean pass means the later is.
        for (i, edge) in edges.iter().enumerate() {
            if i == cand2 {
                continue;
            }
            let ru = find(&mut dsu, edge[0] as usize);
            let rv = find(&mut dsu, edge[1] as usize);
            // Equal roots mean this edge would reconnect one component.
            if ru == rv {
                if cand2 != usize::MAX {
                    return edges[cand1].clone();
                }
                return edge.clone();
            }
            dsu[ru] = rv;
        }
        edges[cand2].clone()
    }
}

fn find(dsu: &mut [usize], node: usize) -> usize {
    let mut root = node;
    while dsu[root] != root {
        root = dsu[root];
    }
    // Second walk repoints every visited node at the root (path compression), flattening the
    // structure for later finds.
    let mut node = node;
    while dsu[node] != root {
        let next = dsu[node];
        dsu[node] = root;
        node = next;
    }
    root
}
