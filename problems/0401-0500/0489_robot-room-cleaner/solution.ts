class Solution {
    cleanRoom(sweeper: Robot): void {
        const dirs: number[][] = [
            [-1, 0],
            [0, 1],
            [1, 0],
            [0, -1],
        ]; // up, right, down, left
        const visited = new Set<string>(["0,0"]);
        sweeper.clean();
        // Iterative spiral DFS (a 100 x 200 grid overflows recursive DFS):
        // a frame is [row, col, entry direction, next relative direction].
        // Invariant: iteration i of the top frame starts with the sweeper
        // facing (entry + i) % 4, and every iteration ends with exactly one
        // turnRight — either directly (blocked ahead) or deferred, arriving
        // from the child via the back-out sequence below.
        const stack: number[][] = [[0, 0, 0, 0]];
        while (stack.length > 0) {
            const frame = stack[stack.length - 1];
            const row = frame[0];
            const col = frame[1];
            const entry = frame[2];
            const index = frame[3];
            if (index === 4) {
                stack.pop();
                if (stack.length > 0) {
                    // Back out of the child: about-face, retrace the step,
                    // about-face, then the parent's trailing turnRight into
                    // its next direction.
                    sweeper.turnRight();
                    sweeper.turnRight();
                    sweeper.move();
                    sweeper.turnRight();
                    sweeper.turnRight();
                    sweeper.turnRight();
                }
                continue;
            }
            const face = (entry + index) % 4;
            const nrow = row + dirs[face][0];
            const ncol = col + dirs[face][1];
            if (!visited.has(`${nrow},${ncol}`) && sweeper.move()) {
                visited.add(`${nrow},${ncol}`);
                sweeper.clean();
                frame[3] = index + 1;
                stack.push([nrow, ncol, face, 0]);
            } else {
                sweeper.turnRight();
                frame[3] = index + 1;
            }
        }
    }
}
