use std::collections::HashSet;

struct Region {
    cells: Vec<(usize, usize)>,
    // Distinct threatened 0-cells, encoded row * cols + col.
    frontier: HashSet<usize>,
    walls: i32,
}

impl Solution {
    pub fn contain_virus(is_infected: Vec<Vec<i32>>) -> i32 {
        // Nothing here is a choice: each day the region whose frontier (the
        // uninfected cells it would reach tonight) is largest gets walled,
        // every other region infects its frontier, and the answer just
        // accumulates the daily wall counts until no frontier is left.
        let mut grid = is_infected;
        let rows = grid.len();
        let cols = grid[0].len();
        let mut walls = 0;
        loop {
            let mut label = vec![vec![-1; cols]; rows];
            let mut regions: Vec<Region> = Vec::new();
            for row in 0..rows {
                for col in 0..cols {
                    if grid[row][col] == 1 && label[row][col] < 0 {
                        regions.push(Self::measure(&grid, &mut label, row, col, regions.len() as i32));
                    }
                }
            }
            if regions.is_empty() {
                return walls;
            }
            let mut best = 0;
            for i in 1..regions.len() {
                if regions[i].frontier.len() > regions[best].frontier.len() {
                    best = i;
                }
            }
            // No region threatens anything: the outbreak is over, walled or
            // fully spread.
            if regions[best].frontier.is_empty() {
                return walls;
            }
            walls += regions[best].walls;
            // 2 marks the quarantined region: inert, never spreading again
            // and never part of a later region.
            for &(r, c) in &regions[best].cells {
                grid[r][c] = 2;
            }
            // The night: everyone else infects their frontier at once. A
            // cell the walled region had threatened still falls to an active
            // region — walls seal only the edges they stand on.
            for (i, region) in regions.iter().enumerate() {
                if i != best {
                    for &cell in &region.frontier {
                        grid[cell / cols][cell % cols] = 1;
                    }
                }
            }
        }
    }

    // Walk one region with an explicit stack, collecting its cells, its
    // frontier (distinct threatened 0-cells, encoded row*cols+col) and its
    // wall count — one wall per region/0-cell shared edge.
    fn measure(grid: &[Vec<i32>], label: &mut [Vec<i32>], row: usize, col: usize, id: i32) -> Region {
        let rows = grid.len() as i32;
        let cols = grid[0].len() as i32;
        let mut region = Region {
            cells: Vec::new(),
            frontier: HashSet::new(),
            walls: 0,
        };
        label[row][col] = id;
        let mut stack = vec![(row, col)];
        let dr = [-1, 1, 0, 0];
        let dc = [0, 0, -1, 1];
        while let Some((r, c)) = stack.pop() {
            region.cells.push((r, c));
            for d in 0..4 {
                let nr = r as i32 + dr[d];
                let nc = c as i32 + dc[d];
                if nr < 0 || nr >= rows || nc < 0 || nc >= cols {
                    continue;
                }
                let (nr, nc) = (nr as usize, nc as usize);
                if grid[nr][nc] == 0 {
                    region.frontier.insert(nr * cols as usize + nc);
                    region.walls += 1;
                } else if grid[nr][nc] == 1 && label[nr][nc] < 0 {
                    label[nr][nc] = id;
                    stack.push((nr, nc));
                }
            }
        }
        region
    }
}
