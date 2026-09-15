function findShortestWay(maze: number[][], ball: number[], hole: number[]): string {
    const m = maze.length,
        n = maze[0].length;
    const hr = hole[0],
        hc = hole[1];
    const dist: number[][] = Array.from({ length: m }, () => Array(n).fill(-1));
    const paths: string[][] = Array.from({ length: m }, () => Array(n).fill(null));
    // min-heap of [d, instructions, r, c] ordered by distance, then the
    // instruction string
    const heap: (number | string)[][] = [];
    const less = (a: (number | string)[], b: (number | string)[]): boolean =>
        a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);
    const push = (item: (number | string)[]): void => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (!less(heap[i], heap[p])) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = (): (number | string)[] => {
        const top = heap[0];
        const last = heap.pop()!;
        if (heap.length) {
            heap[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1,
                    r = l + 1;
                let s = i;
                if (l < heap.length && less(heap[l], heap[s])) s = l;
                if (r < heap.length && less(heap[r], heap[s])) s = r;
                if (s === i) break;
                [heap[s], heap[i]] = [heap[i], heap[s]];
                i = s;
            }
        }
        return top;
    };
    // Dijkstra over stopping cells, but the hole is a terminal that captures
    // the ball mid-roll. States carry (distance, instructions) and the heap
    // orders by distance first, string second, so the first time the hole
    // pops, its pair is distance-minimal and, among those, lexicographically
    // minimal.
    dist[ball[0]][ball[1]] = 0;
    paths[ball[0]][ball[1]] = "";
    push([0, "", ball[0], ball[1]]);
    const dirs = [
        [1, 0],
        [0, -1],
        [0, 1],
        [-1, 0],
    ];
    const letters = ["d", "l", "r", "u"];
    while (heap.length) {
        const [d, p, r, c] = pop() as [number, string, number, number];
        // Dijkstra settles cells in (distance, instructions) order: hole
        // popped => its pair is final.
        if (r === hr && c === hc) return p;
        // Stale heap entry (cell was already relaxed smaller): skip.
        if (d > dist[r][c] || (d === dist[r][c] && p > paths[r][c])) continue;
        // The "next direction must differ from the last" rule needs no
        // code: the ball stopped against a wall in that direction, so
        // re-choosing it rolls zero cells.
        for (let dir = 0; dir < 4; dir++) {
            const dr = dirs[dir][0],
                dc = dirs[dir][1];
            // Roll until the next cell is a wall/border — but stepping
            // onto the hole ends the roll right there: the ball drops in
            // instead of rolling on.
            let nr = r,
                nc = c,
                steps = 0;
            while (nr + dr >= 0 && nr + dr < m && nc + dc >= 0 && nc + dc < n && maze[nr + dr][nc + dc] === 0) {
                nr += dr;
                nc += dc;
                steps++;
                if (nr === hr && nc === hc) break;
            }
            if (steps > 0) {
                const nd = d + steps;
                const np = p + letters[dir];
                // Relax on the (distance, instructions) pair.
                if (dist[nr][nc] === -1 || nd < dist[nr][nc] || (nd === dist[nr][nc] && np < paths[nr][nc])) {
                    dist[nr][nc] = nd;
                    paths[nr][nc] = np;
                    push([nd, np, nr, nc]);
                }
            }
        }
    }
    // Heap exhausted: the ball can never reach the hole.
    return "impossible";
}
