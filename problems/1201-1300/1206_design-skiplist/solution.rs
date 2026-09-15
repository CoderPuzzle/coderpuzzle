const MAX_LEVEL: usize = 16;
const NIL: usize = 0;

struct SkipNode {
    val: i32,
    next: Vec<usize>,
}

// A skiplist stored arena-style: every node lives in `nodes` and links are
// plain indices (NIL = 0 is the sentinel head). add promotes a node to a
// random level (geometric, p = 1/2) and splices it into every layer it
// occupies; search/erase descend from the top layer, always moving to the
// rightmost node whose value stays below the target. The node type is
// named SkipNode to avoid clashing with the judge-assembled Node type.
pub struct Skiplist {
    nodes: Vec<SkipNode>,
    rng: u64,
}

impl Skiplist {
    pub fn new() -> Self {
        Skiplist {
            nodes: vec![SkipNode {
                val: i32::MIN,
                next: vec![NIL; MAX_LEVEL],
            }],
            rng: 0x9E3779B97F4A7C15,
        }
    }

    fn random_level(&mut self) -> usize {
        // xorshift64 — the promotion coin only needs to be roughly fair.
        let mut x = self.rng;
        x ^= x << 13;
        x ^= x >> 7;
        x ^= x << 17;
        self.rng = x;
        let mut level = 1;
        while (x & 1) == 0 && level < MAX_LEVEL {
            level += 1;
            x >>= 1;
        }
        level
    }

    fn predecessors(&self, target: i32) -> Vec<usize> {
        let mut update = vec![NIL; MAX_LEVEL];
        let mut cur = NIL;
        for i in (0..MAX_LEVEL).rev() {
            while self.nodes[cur].next[i] != NIL && self.nodes[self.nodes[cur].next[i]].val < target {
                cur = self.nodes[cur].next[i];
            }
            update[i] = cur;
        }
        update
    }

    pub fn search(&mut self, target: i32) -> bool {
        let mut cur = NIL;
        for i in (0..MAX_LEVEL).rev() {
            while self.nodes[cur].next[i] != NIL && self.nodes[self.nodes[cur].next[i]].val < target {
                cur = self.nodes[cur].next[i];
            }
        }
        cur = self.nodes[cur].next[0];
        cur != NIL && self.nodes[cur].val == target
    }

    pub fn add(&mut self, num: i32) {
        let update = self.predecessors(num);
        let level = self.random_level();
        let mut node = SkipNode {
            val: num,
            next: vec![NIL; level],
        };
        // Splice into each layer the node actually occupies.
        for i in 0..level {
            node.next[i] = self.nodes[update[i]].next[i];
        }
        let index = self.nodes.len();
        self.nodes.push(node);
        for i in 0..level {
            self.nodes[update[i]].next[i] = index;
        }
    }

    pub fn erase(&mut self, num: i32) -> bool {
        let update = self.predecessors(num);
        let cur = self.nodes[update[0]].next[0];
        if cur == NIL || self.nodes[cur].val != num {
            return false;
        }
        // Unlink cur only where it is the immediate next node; at higher
        // layers a duplicate with more levels may take over.
        for i in 0..MAX_LEVEL {
            if self.nodes[update[i]].next[i] == cur {
                let target_next = self.nodes[cur].next[i];
                self.nodes[update[i]].next[i] = target_next;
            }
        }
        true
    }
}
