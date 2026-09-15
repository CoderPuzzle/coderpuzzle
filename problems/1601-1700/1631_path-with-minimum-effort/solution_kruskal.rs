struct Dsu {
    parent: Vec<usize>,
    size: Vec<usize>,
}

impl Dsu {
    fn new(n: usize) -> Dsu {
        Dsu {
            parent: (0..n).collect(),
            size: vec![1; n],
        }
    }

    fn find(&mut self, mut x: usize) -> usize {
        // Path compression keeps later finds near O(1).
        while self.parent[x] != x {
            self.parent[x] = self.parent[self.parent[x]];
            x = self.parent[x];
        }
        x
    }

    fn union(&mut self, a: usize, b: usize) {
        let mut ra = self.find(a);
        let mut rb = self.find(b);
        if ra == rb {
            return;
        }
        // Union by size keeps the trees shallow.
        if self.size[ra] < self.size[rb] {
            std::mem::swap(&mut ra, &mut rb);
        }
        self.parent[rb] = ra;
        self.size[ra] += self.size[rb];
    }
}

impl Solution {
    pub fn minimum_effort_path(heights: Vec<Vec<i32>>) -> i32 {
        let rows = heights.len();
        let cols = heights[0].len();
        let total = rows * cols;
        // One edge per adjacent pair (right and down neighbor), endpoints
        // flattened to r*cols + c.
        let mut edges: Vec<(i32, usize, usize)> = Vec::with_capacity(total * 2);
        for r in 0..rows {
            for c in 0..cols {
                if r + 1 < rows {
                    let w = (heights[r + 1][c] - heights[r][c]).abs();
                    edges.push((w, r * cols + c, (r + 1) * cols + c));
                }
                if c + 1 < cols {
                    let w = (heights[r][c + 1] - heights[r][c]).abs();
                    edges.push((w, r * cols + c, r * cols + c + 1));
                }
            }
        }
        // Ascending weight order is Kruskal's skeleton: the first edge that
        // joins the two corners is the minimum possible maximum.
        edges.sort();
        let mut dsu = Dsu::new(total);
        // A 1x1 grid is connected to itself from the start.
        if dsu.find(0) == dsu.find(total - 1) {
            return 0;
        }
        for &(w, a, b) in &edges {
            if dsu.find(a) == dsu.find(b) {
                continue;
            }
            dsu.union(a, b);
            // Once both corners share a component, every path between them
            // uses some edge of weight at least w, and w already suffices.
            if dsu.find(0) == dsu.find(total - 1) {
                return w;
            }
        }
        0
    }
}
