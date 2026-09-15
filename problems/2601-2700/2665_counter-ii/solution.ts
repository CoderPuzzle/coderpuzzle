interface Counter {
    increment: () => number;
    decrement: () => number;
    reset: () => number;
}

function createCounter(init: number): Counter {
    // Two closure slots do all the work: `init` stays frozen as the reset
    // anchor while `count` is the mutable current value every method reads
    // and rewrites. reset() must report the ORIGINAL init, so it restores
    // from the captured parameter rather than from count.
    let count = init;
    return {
        increment: () => ++count,
        decrement: () => --count,
        reset: () => (count = init),
    };
}

class Solution {
    run(counterCase: CounterIICase): void {
        counterCase.drive(createCounter);
    }
}
