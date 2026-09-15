use std::collections::VecDeque;

impl Solution {
    pub fn minimum_operations(grid: Vec<Vec<i32>>) -> i32 {
        let rows = grid.len();
        let columns = grid[0].len();
        let total = rows * columns;
        let mut adjacency = vec![Vec::new(); total];
        let mut left_vertices = Vec::new();
        let directions = [(-1_isize, 0_isize), (1, 0), (0, -1), (0, 1)];
        for row in 0..rows {
            for column in 0..columns {
                if grid[row][column] == 0 || (row + column) % 2 == 1 {
                    continue;
                }
                let vertex = row * columns + column;
                left_vertices.push(vertex);
                for &(dr, dc) in &directions {
                    let nr = row as isize + dr;
                    let nc = column as isize + dc;
                    if nr >= 0
                        && nr < rows as isize
                        && nc >= 0
                        && nc < columns as isize
                        && grid[nr as usize][nc as usize] == 1
                    {
                        adjacency[vertex].push(nr as usize * columns + nc as usize);
                    }
                }
            }
        }

        let mut pair_left = vec![usize::MAX; total];
        let mut pair_right = vec![usize::MAX; total];
        let mut distance = vec![0_usize; total];
        let infinity = total + 1;
        let mut stack = vec![0_usize; total];
        let mut path_edges = vec![0_usize; total];
        let mut matching = 0_i32;
        loop {
            let shortest = Self::layer(
                &left_vertices,
                &adjacency,
                &pair_left,
                &pair_right,
                &mut distance,
                infinity,
            );
            if shortest == infinity {
                break;
            }
            let mut next_edge = vec![0_usize; total];
            for &vertex in &left_vertices {
                if pair_left[vertex] == usize::MAX
                    && Self::augment(
                        vertex,
                        shortest,
                        &adjacency,
                        &mut pair_left,
                        &mut pair_right,
                        &mut distance,
                        infinity,
                        &mut next_edge,
                        &mut stack,
                        &mut path_edges,
                    )
                {
                    matching += 1;
                }
            }
        }
        matching
    }

    fn layer(
        left_vertices: &[usize],
        adjacency: &[Vec<usize>],
        pair_left: &[usize],
        pair_right: &[usize],
        distance: &mut [usize],
        infinity: usize,
    ) -> usize {
        let mut queue = VecDeque::new();
        for &vertex in left_vertices {
            if pair_left[vertex] == usize::MAX {
                distance[vertex] = 0;
                queue.push_back(vertex);
            } else {
                distance[vertex] = infinity;
            }
        }
        let mut shortest = infinity;
        while let Some(vertex) = queue.pop_front() {
            if distance[vertex] >= shortest {
                continue;
            }
            for &neighbor in &adjacency[vertex] {
                let mate = pair_right[neighbor];
                if mate == usize::MAX {
                    shortest = distance[vertex] + 1;
                } else if distance[mate] == infinity {
                    distance[mate] = distance[vertex] + 1;
                    queue.push_back(mate);
                }
            }
        }
        shortest
    }

    #[allow(clippy::too_many_arguments)]
    fn augment(
        root: usize,
        shortest: usize,
        adjacency: &[Vec<usize>],
        pair_left: &mut [usize],
        pair_right: &mut [usize],
        distance: &mut [usize],
        infinity: usize,
        next_edge: &mut [usize],
        stack: &mut [usize],
        path_edges: &mut [usize],
    ) -> bool {
        let mut size = 1;
        stack[0] = root;
        while size > 0 {
            let vertex = stack[size - 1];
            if next_edge[vertex] == adjacency[vertex].len() {
                distance[vertex] = infinity;
                size -= 1;
                continue;
            }
            let neighbor = adjacency[vertex][next_edge[vertex]];
            next_edge[vertex] += 1;
            let mate = pair_right[neighbor];
            if mate == usize::MAX {
                if distance[vertex] + 1 != shortest {
                    continue;
                }
                pair_left[vertex] = neighbor;
                pair_right[neighbor] = vertex;
                for level in (0..size - 1).rev() {
                    let parent = stack[level];
                    let edge = path_edges[level];
                    pair_left[parent] = edge;
                    pair_right[edge] = parent;
                }
                return true;
            }
            if distance[mate] == distance[vertex] + 1 {
                path_edges[size - 1] = neighbor;
                stack[size] = mate;
                size += 1;
            }
        }
        false
    }
}
