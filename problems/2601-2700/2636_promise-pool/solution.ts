// Greedy FIFO pool over real promises: every free slot is filled from the
// head of the queue — up front in the first synchronous pass, then again
// inside each settlement handler as slots reopen. That keeps at most n
// promises pending at any moment and starts functions strictly in index
// order, which is exactly the schedule the virtual clock pins down. The
// pending counter resolving the aggregate on the quiet pool (nothing
// running, nothing left to start) also covers the empty-input case: the
// returned promise resolves before a single await happens.
function promisePool(functions: (() => Promise<null>)[], n: number): Promise<void> {
    return new Promise((resolve) => {
        let nextIndex = 0;
        let running = 0;
        const launch = () => {
            // Fill every free slot from the head of the queue.
            while (running < n && nextIndex < functions.length) {
                ++running;
                const current = nextIndex++;
                functions[current]().then(() => {
                    --running;
                    launch();
                });
            }
            if (running === 0) resolve();
        };
        launch();
    });
}

class Solution {
    run(driver: PoolCase) {
        return driver.drive(promisePool);
    }
}
