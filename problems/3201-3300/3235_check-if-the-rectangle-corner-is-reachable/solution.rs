fn find(parent: &mut [usize], mut node: usize) -> usize {
    while parent[node] != node {
        parent[node] = parent[parent[node]];
        node = parent[node];
    }
    node
}

fn meets_edge(cx: i64, cy: i64, radius: i64, fixed: i64, vertical: bool, x_corner: i64, y_corner: i64) -> bool {
    // Squared distance from the center to the closest point of the edge
    // segment; integer-exact, so tangency counts as contact.
    let px = if vertical { fixed } else { cx.clamp(0, x_corner) };
    let py = if vertical { cy.clamp(0, y_corner) } else { fixed };
    let dx = cx - px;
    let dy = cy - py;
    dx * dx + dy * dy <= radius * radius
}

impl Solution {
    pub fn can_reach_corner(x_corner: i32, y_corner: i32, circles: Vec<Vec<i32>>) -> bool {
        // Nodes 0..n-1 are the circles, then the top, right, bottom, and
        // left edges of the rectangle. Touching circles merge into obstacle
        // blobs, and a blob pinned to two edges blocks the corner-to-corner
        // path exactly for the pairs left-right, left-bottom, right-top,
        // and top-bottom: spanning walls cut the rectangle in half, while
        // the other two pairs fence off the start and goal corners. A
        // circle covering a corner touches both adjacent edges at once.
        let n = circles.len();
        let (top, right, bottom, left) = (n, n + 1, n + 2, n + 3);
        let mut parent: Vec<usize> = (0..n + 4).collect();
        // Coordinates reach 1e9, so squared distances leave 32-bit range;
        // the geometry below runs in i64, exact for those products.
        let xc = x_corner as i64;
        let yc = y_corner as i64;
        for i in 0..n {
            let cx = circles[i][0] as i64;
            let cy = circles[i][1] as i64;
            let radius = circles[i][2] as i64;
            if meets_edge(cx, cy, radius, yc, false, xc, yc) {
                let a = find(&mut parent, top);
                parent[a] = find(&mut parent, i);
            }
            if meets_edge(cx, cy, radius, xc, true, xc, yc) {
                let a = find(&mut parent, right);
                parent[a] = find(&mut parent, i);
            }
            if meets_edge(cx, cy, radius, 0, false, xc, yc) {
                let a = find(&mut parent, bottom);
                parent[a] = find(&mut parent, i);
            }
            if meets_edge(cx, cy, radius, 0, true, xc, yc) {
                let a = find(&mut parent, left);
                parent[a] = find(&mut parent, i);
            }
            for j in 0..i {
                let dx = cx - circles[j][0] as i64;
                let dy = cy - circles[j][1] as i64;
                let rr = radius + circles[j][2] as i64;
                if dx * dx + dy * dy <= rr * rr {
                    let a = find(&mut parent, i);
                    parent[a] = find(&mut parent, j);
                }
            }
        }
        find(&mut parent, left) != find(&mut parent, right)
            && find(&mut parent, left) != find(&mut parent, bottom)
            && find(&mut parent, right) != find(&mut parent, top)
            && find(&mut parent, top) != find(&mut parent, bottom)
    }
}
