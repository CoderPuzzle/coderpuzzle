class Solution {
    findShortestPath(maze) {
        const dirs = ["U", "D", "L", "R"];
        const dr = [-1, 1, 0, 0];
        const dc = [0, 0, -1, 1];
        const back = { U: "D", D: "U", L: "R", R: "L" };
        const key = (r, c) => (r + 512) * 1024 + (c + 512);

        const seen = new Set([key(0, 0)]);
        let targetKey = maze.isTarget() ? key(0, 0) : -1;

        // Iterative DFS keeps the walker physically on the DFS tree: move to
        // a child when pushing, move back when popping. Each reachable cell
        // is entered exactly once and probed with isTarget().
        const stack = [[0, 0, 0]];
        const parentDirs = [-1];
        while (stack.length > 0) {
            const frame = stack[stack.length - 1];
            const r = frame[0];
            const c = frame[1];
            let idx = frame[2];
            let pushed = false;
            while (idx < 4) {
                const direction = dirs[idx];
                const nr = r + dr[idx];
                const nc = c + dc[idx];
                idx += 1;
                if (maze.canMove(direction) && !seen.has(key(nr, nc))) {
                    maze.move(direction);
                    seen.add(key(nr, nc));
                    if (maze.isTarget()) {
                        targetKey = key(nr, nc);
                    }
                    frame[2] = idx;
                    stack.push([nr, nc, 0]);
                    parentDirs.push(idx - 1);
                    pushed = true;
                    break;
                }
            }
            if (!pushed) {
                stack.pop();
                const parentDir = parentDirs.pop();
                if (stack.length > 0 && parentDir >= 0) {
                    maze.move(back[dirs[parentDir]]);
                }
            }
        }

        if (targetKey < 0) {
            return -1;
        }
        // Unit edge weights: plain BFS over the discovered map.
        const dist = new Map([[key(0, 0), 0]]);
        const queue = [[0, 0]];
        for (let head = 0; head < queue.length; head++) {
            const r = queue[head][0];
            const c = queue[head][1];
            const d = dist.get(key(r, c));
            for (let i = 0; i < 4; i++) {
                const nr = r + dr[i];
                const nc = c + dc[i];
                const nk = key(nr, nc);
                if (seen.has(nk) && !dist.has(nk)) {
                    dist.set(nk, d + 1);
                    queue.push([nr, nc]);
                }
            }
        }
        return dist.get(targetKey);
    }
}
