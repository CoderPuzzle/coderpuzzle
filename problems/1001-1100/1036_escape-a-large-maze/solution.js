const GRID_SIZE = 1000000;

function cellKey(x, y) {
    return x * GRID_SIZE + y;
}

// With n blocked cells, the largest pocket they can wall off is the
// triangular staircase in a grid corner: n * (n - 1) / 2 cells. If a
// flood-fill from an endpoint ever visits more cells than that, the
// endpoint cannot be trapped, so the fill can stop early instead of
// exploring the (unmaterializable) rest of the grid.
function canEscapeLocally(start, goal, blockedSet, maxEnclosedArea) {
    const visited = new Set([cellKey(start[0], start[1])]);
    const stack = [[start[0], start[1]]];
    const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];

    while (stack.length > 0) {
        if (visited.size > maxEnclosedArea) {
            return true;
        }
        const [x, y] = stack.pop();
        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || nx >= GRID_SIZE || ny < 0 || ny >= GRID_SIZE) {
                continue;
            }
            const k = cellKey(nx, ny);
            if (blockedSet.has(k) || visited.has(k)) {
                continue;
            }
            if (nx === goal[0] && ny === goal[1]) {
                return true;
            }
            visited.add(k);
            stack.push([nx, ny]);
        }
    }
    return false;
}

/**
 * @param {number[][]} blocked
 * @param {number[]} source
 * @param {number[]} target
 * @return {boolean}
 */
var isEscapePossible = function (blocked, source, target) {
    const blockedSet = new Set(blocked.map(([x, y]) => cellKey(x, y)));
    const n = blockedSet.size;
    const maxEnclosedArea = (n * (n - 1)) / 2;

    // source cannot reach past its own pocket boundary AND target cannot
    // reach past its own pocket boundary -- both must escape their local
    // neighborhood for a path to exist between them.
    return (
        canEscapeLocally(source, target, blockedSet, maxEnclosedArea) &&
        canEscapeLocally(target, source, blockedSet, maxEnclosedArea)
    );
};
