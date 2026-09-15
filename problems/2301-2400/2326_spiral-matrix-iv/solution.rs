impl Solution {
    pub fn spiral_matrix(m: i32, n: i32, head: Option<Box<ListNode>>) -> Vec<Vec<i32>> {
        // The -1 fill doubles as the unvisited marker. A cursor advances along
        // the clockwise right/down/left/up cycle and rotates 90 degrees whenever
        // the candidate cell leaves the grid or was already written; it stops
        // when the list runs out, leaving every unwritten cell at -1.
        let mut matrix = vec![vec![-1i32; n as usize]; m as usize];
        let directions: [(i32, i32); 4] = [(0, 1), (1, 0), (0, -1), (-1, 0)];
        let (mut row, mut column, mut direction) = (0i32, 0i32, 0usize);
        let mut current = head.as_deref();
        while let Some(node) = current {
            matrix[row as usize][column as usize] = node.val;
            current = node.next.as_deref();
            if current.is_none() {
                break;
            }
            let (step_row, step_column) = directions[direction];
            let mut next_row = row + step_row;
            let mut next_column = column + step_column;
            let inside = 0 <= next_row && next_row < m && 0 <= next_column && next_column < n;
            if !inside || matrix[next_row as usize][next_column as usize] != -1 {
                direction = (direction + 1) % 4;
                let (step_row, step_column) = directions[direction];
                next_row = row + step_row;
                next_column = column + step_column;
            }
            row = next_row;
            column = next_column;
        }
        matrix
    }
}
