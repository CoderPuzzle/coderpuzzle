// Owner per node (-1 = unlocked) plus children adjacency built from the
// parent array; upgrade enumerates descendants with an explicit stack so
// a 2000-node chain is never recursed into.
pub struct LockingTree {
    parent: Vec<i32>,
    owner: Vec<i32>,
    children: Vec<Vec<i32>>,
}

impl LockingTree {
    pub fn new(parent: Vec<i32>) -> Self {
        let owner = vec![-1; parent.len()];
        let mut children = vec![Vec::new(); parent.len()];
        for node in 1..parent.len() {
            children[parent[node] as usize].push(node as i32);
        }
        LockingTree {
            parent,
            owner,
            children,
        }
    }

    pub fn lock(&mut self, num: i32, user: i32) -> bool {
        if self.owner[num as usize] != -1 {
            return false;
        }
        self.owner[num as usize] = user;
        true
    }

    pub fn unlock(&mut self, num: i32, user: i32) -> bool {
        if self.owner[num as usize] != user {
            return false;
        }
        self.owner[num as usize] = -1;
        true
    }

    pub fn upgrade(&mut self, num: i32, user: i32) -> bool {
        // Condition 1: the node itself must be unlocked.
        if self.owner[num as usize] != -1 {
            return false;
        }
        // Condition 3: no ancestor may be locked.
        let mut node = self.parent[num as usize];
        while node != -1 {
            if self.owner[node as usize] != -1 {
                return false;
            }
            node = self.parent[node as usize];
        }
        // Condition 2: at least one locked descendant. Collect every
        // descendant iteratively so the check and the later unlock share
        // one traversal.
        let mut descendants = Vec::new();
        let mut stack = self.children[num as usize].clone();
        let mut has_locked = false;
        while let Some(node) = stack.pop() {
            descendants.push(node);
            if self.owner[node as usize] != -1 {
                has_locked = true;
            }
            stack.extend(self.children[node as usize].iter().copied());
        }
        if !has_locked {
            return false;
        }
        self.owner[num as usize] = user;
        for node in descendants {
            self.owner[node as usize] = -1;
        }
        true
    }
}
