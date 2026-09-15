// Cut the square into four triangles per cell — top, right, bottom, left —
// and let an iterative union-find glue them together: the cell's own
// marking joins triangles inside the cell, and shared edges join triangles
// across cell borders. Each surviving set is exactly one region, so the
// answer is the number of distinct roots among the 4*n*n triangles.
// Nothing recurses — find walks parent links and compresses the walked
// path in loops.
impl Solution {
    pub fn regions_by_slashes(grid: Vec<String>) -> i32 {
        let n = grid.len();
        let mut parent: Vec<usize> = (0..4 * n * n).collect();
        fn find(parent: &mut [usize], x: usize) -> usize {
            let mut root = x;
            while parent[root] != root {
                root = parent[root];
            }
            let mut x = x;
            while parent[x] != root {
                let next = parent[x];
                parent[x] = root;
                x = next;
            }
            root
        }
        fn unite(parent: &mut [usize], a: usize, b: usize) {
            let ra = find(parent, a);
            let rb = find(parent, b);
            if ra != rb {
                parent[ra] = rb;
            }
        }
        for i in 0..n {
            for j in 0..n {
                let base = 4 * (i * n + j);
                let ch = grid[i].as_bytes()[j];
                // '/' joins top with left and right with bottom, '\' joins
                // top with right and bottom with left, a blank joins all.
                if ch == b' ' {
                    unite(&mut parent, base, base + 1);
                    unite(&mut parent, base + 1, base + 2);
                    unite(&mut parent, base + 2, base + 3);
                } else if ch == b'/' {
                    unite(&mut parent, base, base + 3);
                    unite(&mut parent, base + 1, base + 2);
                } else {
                    unite(&mut parent, base, base + 1);
                    unite(&mut parent, base + 2, base + 3);
                }
                // The bottom triangle shares its open edge with the cell
                // below's top triangle; the right triangle with the right
                // neighbor's left triangle.
                if i + 1 < n {
                    unite(&mut parent, base + 2, base + 4 * n);
                }
                if j + 1 < n {
                    unite(&mut parent, base + 1, base + 4 + 3);
                }
            }
        }
        // Roots are exactly the self-parented nodes, so counting those
        // counts regions.
        let mut regions = 0;
        for x in 0..4 * n * n {
            if parent[x] == x {
                regions += 1;
            }
        }
        regions as i32
    }
}
