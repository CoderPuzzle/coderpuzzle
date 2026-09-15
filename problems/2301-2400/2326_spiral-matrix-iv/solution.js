/**
 * @param {number} m
 * @param {number} n
 * @param {ListNode} head
 * @return {number[][]}
 */
var spiralMatrix = function (m, n, head) {
    // The -1 fill doubles as the unvisited marker. A cursor advances along
    // the clockwise right/down/left/up cycle and rotates 90 degrees whenever
    // the candidate cell leaves the grid or was already written; it stops
    // when the list runs out, leaving every unwritten cell at -1.
    const matrix = Array.from({ length: m }, () => new Array(n).fill(-1));
    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];
    let row = 0;
    let column = 0;
    let direction = 0;
    let node = head;
    while (node !== null) {
        matrix[row][column] = node.val;
        node = node.next;
        if (node === null) {
            break;
        }
        let nextRow = row + directions[direction][0];
        let nextColumn = column + directions[direction][1];
        if (nextRow < 0 || nextRow >= m || nextColumn < 0 || nextColumn >= n || matrix[nextRow][nextColumn] !== -1) {
            direction = (direction + 1) % 4;
            nextRow = row + directions[direction][0];
            nextColumn = column + directions[direction][1];
        }
        row = nextRow;
        column = nextColumn;
    }
    return matrix;
};
