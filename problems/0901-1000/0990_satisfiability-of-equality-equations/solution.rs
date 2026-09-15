impl Solution {
    pub fn equations_possible(equations: Vec<String>) -> bool {
        // Each letter starts as its own class; parent[x] names its root.
        let mut parent = [0_usize; 26];
        for letter in 0..26 {
            parent[letter] = letter;
        }
        // Pass one fuses every equality, so each class is the full set of
        // letters some chain of '==' has tied together.
        for equation in &equations {
            let sides = equation.as_bytes();
            if sides[1] == b'=' {
                let left = Self::find(&mut parent, usize::from(sides[0] - b'a'));
                parent[left] = Self::find(&mut parent, usize::from(sides[3] - b'a'));
            }
        }
        // Pass two judges the disequalities: an inequality whose sides sit
        // in one class is unsatisfiable, since both must take one value.
        for equation in &equations {
            let sides = equation.as_bytes();
            if sides[1] == b'!' {
                if Self::find(&mut parent, usize::from(sides[0] - b'a'))
                    == Self::find(&mut parent, usize::from(sides[3] - b'a'))
                {
                    return false;
                }
            }
        }
        true
    }

    // Iterative find with path compression: chase to the root, then point
    // every visited letter straight at it.
    fn find(parent: &mut [usize; 26], mut letter: usize) -> usize {
        let mut root = letter;
        while parent[root] != root {
            root = parent[root];
        }
        while parent[letter] != root {
            let next = parent[letter];
            parent[letter] = root;
            letter = next;
        }
        root
    }
}
