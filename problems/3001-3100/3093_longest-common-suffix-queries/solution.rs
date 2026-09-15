impl Solution {
    pub fn string_indices(words_container: Vec<String>, words_query: Vec<String>) -> Vec<i32> {
        let lens: Vec<usize> = words_container.iter().map(|w| w.len()).collect();
        // Tie-break: shorter word wins, then the smaller index.
        let better = |a: usize, b: i32| -> bool {
            if b == -1 {
                return true;
            }
            let b = b as usize;
            if lens[a] != lens[b] {
                return lens[a] < lens[b];
            }
            a < b
        };

        struct Node {
            children: std::collections::HashMap<u8, i32>,
            best: i32,
        }
        let new_node = || Node {
            children: std::collections::HashMap::new(),
            best: -1,
        };
        // Trie over reversed words; node 0 is the root (empty suffix).
        let mut nodes: Vec<Node> = vec![new_node()];

        // Insert each word backwards, annotating every visited node, root included.
        for (i, word) in words_container.iter().enumerate() {
            let mut cur: usize = 0;
            if better(i, nodes[0].best) {
                nodes[0].best = i as i32;
            }
            for b in word.bytes().rev() {
                let nxt = match nodes[cur].children.get(&b) {
                    Some(&n) => n,
                    None => {
                        let n = nodes.len() as i32;
                        nodes.push(new_node());
                        nodes[cur].children.insert(b, n);
                        n
                    }
                };
                cur = nxt as usize;
                if better(i, nodes[cur].best) {
                    nodes[cur].best = i as i32;
                }
            }
        }

        let mut ans: Vec<i32> = Vec::with_capacity(words_query.len());
        // Walk the reversed query as deep as the trie allows; deepest node's best wins.
        for word in &words_query {
            let mut cur: usize = 0;
            // Root's best answers the empty-suffix case (no child matched).
            let mut res = nodes[0].best;
            for b in word.bytes().rev() {
                match nodes[cur].children.get(&b) {
                    Some(&n) => {
                        cur = n as usize;
                        res = nodes[cur].best;
                    }
                    None => break,
                }
            }
            ans.push(res);
        }
        ans
    }
}
