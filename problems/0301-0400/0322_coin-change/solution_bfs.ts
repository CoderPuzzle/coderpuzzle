function coinChange(coins: number[], amount: number): number {
    // BFS over amounts: level k holds every amount reachable with exactly
    // k coins, so the first time `amount` is dequeued its level is the
    // minimum coin count. visited keeps each amount enqueued once.
    const visited: boolean[] = new Array(amount + 1).fill(false);
    visited[0] = true;
    const queue: number[] = [0];
    let level = 0;
    for (let head = 0; head < queue.length; level++) {
        const size = queue.length;
        for (; head < size; head++) {
            const a = queue[head];
            if (a === amount) {
                // Level order guarantees no cheaper level exists.
                return level;
            }
            for (const c of coins) {
                // Oversized coins simply cannot extend this amount.
                if (c <= amount - a && !visited[a + c]) {
                    visited[a + c] = true;
                    queue.push(a + c);
                }
            }
        }
    }
    // The queue drained without ever reaching amount: unmakeable.
    return -1;
}
