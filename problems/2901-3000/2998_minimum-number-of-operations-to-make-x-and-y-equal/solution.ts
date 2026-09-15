function minimumOperationsToMakeEqual(x: number, y: number): number {
    // Values are states and every operation is a unit-cost edge, so BFS
    // layers count operations. Only +1 ever raises the value, so a
    // target at or above x costs exactly y - x steps; below x, an
    // optimal path never climbs past x + (x - y), which the
    // 1 <= x, y <= 10^4 box keeps under 2 * 10^4.
    const limit = 20010;
    const dist: number[] = new Array(limit + 1).fill(-1);
    dist[x] = 0;
    const queue: number[] = [x];
    for (let head = 0; head < queue.length; ++head) {
        const v = queue[head];
        if (v === y) {
            return dist[v];
        }
        const steps = [v - 1, v + 1];
        if (v % 11 === 0) steps.push(v / 11);
        if (v % 5 === 0) steps.push(v / 5);
        for (const nxt of steps) {
            if (nxt >= 1 && nxt <= limit && dist[nxt] === -1) {
                dist[nxt] = dist[v] + 1;
                queue.push(nxt);
            }
        }
    }
    return dist[y];
}
