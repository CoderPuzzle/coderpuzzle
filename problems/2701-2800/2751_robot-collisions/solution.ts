function survivedRobotsHealths(positions: number[], healths: number[], directions: string): number[] {
    const h = healths.slice();
    const n = positions.length;
    const order = Array.from({ length: n }, (_, i) => i);
    order.sort((a, b) => positions[a] - positions[b]);
    // Sweep left to right; every collision is a right-mover meeting a
    // left-mover face to face, so a stack of sweep survivors is the only
    // state needed. Health changes are written into `h` so survivors keep
    // their decremented values.
    const stack: number[] = [];
    for (const idx of order) {
        if (directions[idx] === "R") {
            // Right-movers wait on the stack for someone to hit them.
            stack.push(idx);
        } else {
            // A left-mover duels right-movers off the stack top until it
            // dies or the right-movers run out (same-direction robots ahead
            // can never collide with it).
            let alive = true;
            while (stack.length > 0 && directions[stack[stack.length - 1]] === "R") {
                const top = stack[stack.length - 1];
                // Weaker top dies; the incoming robot loses 1 health and
                // fights on. Stronger top survives at -1; equal kills both.
                if (h[top] < h[idx]) {
                    h[idx] -= 1;
                    stack.pop();
                } else if (h[top] > h[idx]) {
                    h[top] -= 1;
                    alive = false;
                    break;
                } else {
                    stack.pop();
                    alive = false;
                    break;
                }
            }
            if (alive) {
                stack.push(idx);
            }
        }
    }
    // Survivors are exactly the stack, but reported in input order.
    const survivors = new Set<number>(stack);
    const result: number[] = [];
    for (let i = 0; i < n; i++) {
        if (survivors.has(i)) {
            result.push(h[i]);
        }
    }
    return result;
}
