class Solution {
    findMinimumPath(maze) {
        const dirs = ["U", "D", "L", "R"];
        const dr = [-1, 1, 0, 0];
        const dc = [0, 0, -1, 1];
        const back = { U: "D", D: "U", L: "R", R: "L" };
        const key = (r, c) => (r + 128) * 256 + (c + 128);

        const cost = new Map([[key(0, 0), 0]]);
        let foundTarget = maze.isTarget();
        let goalR = 0;
        let goalC = 0;

        // Iterative DFS keeps the walker physically on the DFS tree: move to
        // a child when pushing, move back when popping. Each discovered cell
        // records the toll move() reported on entering it.
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
                if (maze.canMove(direction) && !cost.has(key(nr, nc))) {
                    cost.set(key(nr, nc), maze.move(direction));
                    if (maze.isTarget()) {
                        foundTarget = true;
                        goalR = nr;
                        goalC = nc;
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

        if (!foundTarget) {
            return -1;
        }
        // Dijkstra over the surveyed tolls, on a binary min-heap of
        // (toll, r, c) records.
        const dist = new Map([[key(0, 0), 0]]);
        const heap = [[0, 0, 0]];
        const push = (entry) => {
            heap.push(entry);
            let i = heap.length - 1;
            while (i > 0) {
                const parent = (i - 1) >> 1;
                if (heap[parent][0] <= heap[i][0]) break;
                [heap[parent], heap[i]] = [heap[i], heap[parent]];
                i = parent;
            }
        };
        const pop = () => {
            const top = heap[0];
            const last = heap.pop();
            if (heap.length > 0) {
                heap[0] = last;
                let i = 0;
                for (;;) {
                    const left = 2 * i + 1;
                    const right = left + 1;
                    let smallest = i;
                    if (left < heap.length && heap[left][0] < heap[smallest][0]) smallest = left;
                    if (right < heap.length && heap[right][0] < heap[smallest][0]) smallest = right;
                    if (smallest === i) break;
                    [heap[smallest], heap[i]] = [heap[i], heap[smallest]];
                    i = smallest;
                }
            }
            return top;
        };
        while (heap.length > 0) {
            const [du, r, c] = pop();
            if (du > dist.get(key(r, c))) {
                continue;
            }
            for (let i = 0; i < 4; i++) {
                const nr = r + dr[i];
                const nc = c + dc[i];
                const nk = key(nr, nc);
                const step = cost.get(nk);
                if (step !== undefined) {
                    const nd = du + step;
                    const known = dist.get(nk);
                    if (known === undefined || nd < known) {
                        dist.set(nk, nd);
                        push([nd, nr, nc]);
                    }
                }
            }
        }
        const answer = dist.get(key(goalR, goalC));
        return answer === undefined ? -1 : answer;
    }
}
