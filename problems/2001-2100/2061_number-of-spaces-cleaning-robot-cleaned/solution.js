/**
 * @param {number[][]} room
 * @return {number}
 */
var numberOfCleanRooms = function (room) {
    const rows = room.length;
    const cols = room[0].length;
    const dr = [0, 1, 0, -1];
    const dc = [1, 0, -1, 0];
    const seen = new Uint8Array(rows * cols * 4);
    const cleaned = new Uint8Array(rows * cols);
    let row = 0;
    let col = 0;
    let direction = 0;
    let cleanCount = 0;

    while (seen[(row * cols + col) * 4 + direction] === 0) {
        seen[(row * cols + col) * 4 + direction] = 1;
        const cell = row * cols + col;
        if (cleaned[cell] === 0) {
            cleaned[cell] = 1;
            ++cleanCount;
        }

        const nextRow = row + dr[direction];
        const nextCol = col + dc[direction];
        if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols || room[nextRow][nextCol] === 1) {
            direction = (direction + 1) % 4;
        } else {
            row = nextRow;
            col = nextCol;
        }
    }
    return cleanCount;
};
