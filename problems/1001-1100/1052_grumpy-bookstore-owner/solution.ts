function maxSatisfied(customers: number[], grumpy: number[], minutes: number): number {
    let base = 0;
    for (let i = 0; i < customers.length; i++) {
        if (grumpy[i] === 0) {
            base += customers[i];
        }
    }

    let window = 0;
    for (let i = 0; i < minutes; i++) {
        if (grumpy[i] === 1) {
            window += customers[i];
        }
    }
    let best = window;
    for (let i = minutes; i < customers.length; i++) {
        if (grumpy[i] === 1) {
            window += customers[i];
        }
        if (grumpy[i - minutes] === 1) {
            window -= customers[i - minutes];
        }
        best = Math.max(best, window);
    }

    return base + best;
}
