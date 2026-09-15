impl Solution {
    pub fn construct(grid: Vec<Vec<i32>>) -> Option<Box<QuadNode>> {
        fn build(grid: &[Vec<i32>], r0: usize, c0: usize, size: usize) -> Box<QuadNode> {
            let first = grid[r0][c0];
            let mut uniform = true;
            'scan: for r in r0..r0 + size {
                for c in c0..c0 + size {
                    if grid[r][c] != first {
                        uniform = false;
                        break 'scan;
                    }
                }
            }
            if uniform {
                return Box::new(QuadNode::new(first == 1, true));
            }
            let half = size / 2;
            let mut node = Box::new(QuadNode::new(false, false));
            node.top_left = Some(build(grid, r0, c0, half));
            node.top_right = Some(build(grid, r0, c0 + half, half));
            node.bottom_left = Some(build(grid, r0 + half, c0, half));
            node.bottom_right = Some(build(grid, r0 + half, c0 + half, half));
            node
        }
        build(&grid, 0, 0, grid.len()).into()
    }
}
