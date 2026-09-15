function maxPoints(technique1: number[], technique2: number[], k: number): number {
    // Start from the best-of-both baseline: each task pays its larger
    // value. Tasks where technique 1 already wins count toward the quota
    // for free; every task where technique 2 wins must pay back its win
    // (technique2[i] - technique1[i]) whenever the free count falls short
    // of k, and paying back the smallest losses first is plainly optimal.
    // No sort of the whole array is needed.
    let base = 0;
    const losses: number[] = [];
    let free = 0;
    for (let i = 0; i < technique1.length; i++) {
        const a = technique1[i];
        const b = technique2[i];
        if (a >= b) {
            base += a;
            free++;
        } else {
            base += b;
            losses.push(b - a);
        }
    }
    const forced = k - free;
    if (forced > 0) {
        losses.sort((x, y) => x - y);
        for (let i = 0; i < forced; i++) base -= losses[i];
    }
    return base;
}
