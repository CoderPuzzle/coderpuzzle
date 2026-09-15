function lastRemaining(n: number): number {
    // The survivors after every round are an evenly spaced run, so three
    // integers carry the whole state: head, step, remaining. A round kills
    // the head exactly when it sweeps left-to-right (the first number goes
    // first) or the count is odd (the right-to-left pairings then reach
    // it): head += step. Each round also doubles the gap and halves the
    // count; when the count reaches 1, head is the last number — for
    // n = 9 the heads run 1, 2, 2, 6, matching the statement's trace.
    let head = 1,
        step = 1,
        remaining = n,
        leftToRight = true;
    while (remaining > 1) {
        if (leftToRight || remaining % 2 === 1) {
            head += step;
        }
        step *= 2;
        remaining = Math.floor(remaining / 2);
        leftToRight = !leftToRight;
    }
    return head;
}
