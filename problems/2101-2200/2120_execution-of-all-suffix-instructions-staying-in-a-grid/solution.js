/**
 * @param {number} n
 * @param {number[]} startPos
 * @param {string} s
 * @return {number[]}
 */
var executeInstructions = function (n, startPos, s) {
    const answer = new Array(s.length).fill(0);
    const directions = { L: [0, -1], R: [0, 1], U: [-1, 0], D: [1, 0] };
    for (let start = 0; start < s.length; start++) {
        let [row, col] = startPos;
        for (let index = start; index < s.length; index++) {
            const [rowChange, colChange] = directions[s[index]];
            const nextRow = row + rowChange;
            const nextCol = col + colChange;
            if (nextRow < 0 || nextRow >= n || nextCol < 0 || nextCol >= n) break;
            row = nextRow;
            col = nextCol;
            answer[start]++;
        }
    }
    return answer;
};
