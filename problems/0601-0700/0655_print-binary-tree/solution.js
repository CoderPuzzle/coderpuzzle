/**
 * @param {TreeNode} root
 * @return {string[][]}
 */
var printTree = function (root) {
    // The layout is pinned before any cell is written: rows = height + 1,
    // columns = 2^(height+1) - 1, children stepping 2^(height-r-1) columns
    // sideways of their parent. So a first pass measures the tree's height —
    // in edges, the unit the formulas are stated in — on an explicit stack:
    // the placement formulas consume it, so guessing it wrong would shift
    // every cell in the grid.
    let height = 0;
    const measure = [[root, 0]];
    while (measure.length > 0) {
        const [node, depth] = measure.pop();
        if (depth > height) {
            height = depth;
        }
        for (const child of [node.left, node.right]) {
            if (child !== null) {
                measure.push([child, depth + 1]);
            }
        }
    }
    // Second pass: the grid is born as every cell "", the root goes to the
    // exact middle of the top row, and untouched cells simply keep their
    // "" — the empties are the layout: the matrix is as wide as the deepest
    // path alone, not as the node count.
    const rows = height + 1;
    const cols = (1 << (height + 1)) - 1;
    const res = Array.from({ length: rows }, () => new Array(cols).fill(""));
    const place = [[root, 0, (cols - 1) >> 1]];
    while (place.length > 0) {
        const [node, r, c] = place.pop();
        res[r][c] = String(node.val);
        if (node.left !== null || node.right !== null) {
            // An internal node always sits above the last row, so the
            // exponent height - r - 1 is never negative.
            const offset = 1 << (height - r - 1);
            if (node.left !== null) {
                place.push([node.left, r + 1, c - offset]);
            }
            if (node.right !== null) {
                place.push([node.right, r + 1, c + offset]);
            }
        }
    }
    return res;
};
