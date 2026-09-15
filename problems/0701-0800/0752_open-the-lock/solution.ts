function openLock(deadends: string[], target: string): number {
    // BFS over the 10,000 four-digit lock states, one edge per wheel
    // turn: layer order equals turn count, so reaching the target
    // first is optimal.
    const dead = new Set<string>(deadends);
    const start = "0000";
    // A deadend start means the wheels can never move.
    if (dead.has(start)) return -1;
    const seen = new Set<string>([start]);
    let queue: [string, number][] = [[start, 0]];
    while (queue.length > 0) {
        // Build the next layer: every state in it lies one more turn
        // from the start than the current layer.
        const next: [string, number][] = [];
        for (const [state, steps] of queue) {
            if (state === target) return steps;
            for (let i = 0; i < 4; i++) {
                for (const delta of [1, -1]) {
                    // Turn wheel i up or down, wrapping 0..9.
                    const digit = (state.charCodeAt(i) - 48 + delta + 10) % 10;
                    const nxt = state.substring(0, i) + String(digit) + state.substring(i + 1);
                    // Mark seen at enqueue time so each state enters
                    // the queue once; never step on a deadend.
                    if (!seen.has(nxt) && !dead.has(nxt)) {
                        seen.add(nxt);
                        next.push([nxt, steps + 1]);
                    }
                }
            }
        }
        queue = next;
    }
    // Queue exhausted: every neighbor is seen or dead, so the lock
    // cannot be opened.
    return -1;
}
