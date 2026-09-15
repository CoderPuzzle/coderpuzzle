function candy(ratings: number[]): number {
    const n = ratings.length;
    // No weights are ever assigned: each slope's triangular series is summed
    // directly. `up` counts consecutive rises, `down` consecutive falls,
    // `peak` remembers how long the ascent into the current peak was. The
    // first position always costs its floor of 1.
    let total = 1;
    let up = 0;
    let down = 0;
    let peak = 0;
    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            // Rising series: position i is the (up + 1)-th step of the climb
            // and costs exactly that.
            up += 1;
            down = 0;
            total += up + 1;
            peak = up;
        } else if (ratings[i] === ratings[i - 1]) {
            // Equal neighbours constrain nothing: a flat is valley ground,
            // every counter resets, and the position costs 1.
            up = 0;
            down = 0;
            peak = 0;
            total += 1;
        } else {
            // Falling series grows from the valley: 1 for the new floor plus
            // 1 for each earlier falling step, all bumped -- `down`.
            down += 1;
            up = 0;
            total += down;
            if (down > peak) {
                // The descent has passed the ascent's length, so the peak
                // must be one taller per step of overshoot.
                total += 1;
            }
        }
    }
    return total;
}
