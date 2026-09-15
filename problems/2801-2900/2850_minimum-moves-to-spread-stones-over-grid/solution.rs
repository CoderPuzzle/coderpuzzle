impl Solution {
    // Pair every empty cell with a cell still holding at least two stones;
    // the cost of a pair is the Manhattan distance between the cells, and
    // backtracking over all donor choices finds the cheapest perfect
    // pairing.
    pub fn minimum_moves(mut grid: Vec<Vec<i32>>) -> i32 {
        let mut empties: Vec<(usize, usize)> = Vec::new();
        for i in 0..3usize {
            for j in 0..3usize {
                if grid[i][j] == 0 {
                    empties.push((i, j));
                }
            }
        }
        fill(&mut grid, &empties, 0)
    }
}

fn fill(grid: &mut Vec<Vec<i32>>, empties: &[(usize, usize)], k: usize) -> i32 {
    if k == empties.len() {
        return 0;
    }
    let (i, j) = empties[k];
    let mut best = 99;
    for r in 0..3usize {
        for c in 0..3usize {
            if grid[r][c] >= 2 {
                grid[r][c] -= 1;
                let total = (i as i32 - r as i32).abs() + (j as i32 - c as i32).abs() + fill(grid, empties, k + 1);
                if total < best {
                    best = total;
                }
                grid[r][c] += 1;
            }
        }
    }
    best
}
