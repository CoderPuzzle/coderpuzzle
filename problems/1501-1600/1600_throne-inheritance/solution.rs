use std::collections::HashMap;
use std::collections::HashSet;

pub struct ThroneInheritance {
    // An n-ary tree keyed by name: children maps a name to its kids in
    // birth order, and dead holds everyone marked deceased. king is
    // remembered as the traversal root.
    king: String,
    children: HashMap<String, Vec<String>>,
    dead: HashSet<String>,
}

impl ThroneInheritance {
    pub fn new(kingName: String) -> Self {
        let mut children = HashMap::new();
        children.insert(kingName.clone(), Vec::new());
        ThroneInheritance {
            king: kingName,
            children,
            dead: HashSet::new(),
        }
    }

    pub fn birth(&mut self, parentName: String, childName: String) {
        self.children.get_mut(&parentName).unwrap().push(childName.clone());
        self.children.insert(childName, Vec::new());
    }

    pub fn death(&mut self, name: String) {
        self.dead.insert(name);
    }

    pub fn getInheritanceOrder(&mut self) -> Vec<String> {
        // Iterative pre-order DFS (explicit stack, so depth never risks
        // the call stack — the tree can chain up to 1e5 generations
        // deep). Children go on the stack in reverse so the oldest child
        // is popped, and therefore visited, first.
        let mut order = Vec::new();
        let mut stack = vec![self.king.clone()];
        while let Some(name) = stack.pop() {
            if !self.dead.contains(&name) {
                order.push(name.clone());
            }
            if let Some(kids) = self.children.get(&name) {
                for child in kids.iter().rev() {
                    stack.push(child.clone());
                }
            }
        }
        order
    }
}
