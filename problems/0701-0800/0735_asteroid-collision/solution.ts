function asteroidCollision(asteroids: number[]): number[] {
    // The stack holds survivors — internally stable, all collisions resolved.
    const stack: number[] = [];
    for (const asteroid of asteroids) {
        let alive = true;
        // A newcomer can only fight the top, and only when it moves left
        // against a right-moving survivor; other pairs never meet.
        while (alive && stack.length > 0 && asteroid < 0 && stack[stack.length - 1] > 0) {
            const top = stack[stack.length - 1];
            if (top < -asteroid) {
                // Top explodes; the newcomer continues against the new top.
                stack.pop();
            } else if (top === -asteroid) {
                // Equal sizes: both explode.
                stack.pop();
                alive = false;
            } else {
                // Top is larger: the newcomer explodes.
                alive = false;
            }
        }
        if (alive) {
            stack.push(asteroid);
        }
    }
    return stack;
}
