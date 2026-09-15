// The pinned compile sees no DOM or Node lib set — declare the one timer
// global this solution needs.
declare function setTimeout(handler: () => void, timeout: number): unknown;

function sleep(millis: number): Promise<unknown> {
    // A Promise scheduled on setTimeout settles only through the timer
    // queue, never before the requested delay; resolving with the elapsed
    // span keeps every then() consumer informed without changing what the
    // driver judges.
    return new Promise((resolve) => {
        setTimeout(() => resolve(millis), millis);
    });
}

class Solution {
    async run(sleepCase: SleepCase): Promise<void> {
        await sleepCase.measure(sleep);
    }
}
