function sleep(millis) {
    // A Promise scheduled on setTimeout settles only through the timer
    // queue, never before the requested delay; resolving with the elapsed
    // span keeps every then() consumer informed without changing what the
    // driver judges.
    return new Promise((resolve) => {
        setTimeout(() => resolve(millis), millis);
    });
}

class Solution {
    async run(sleepCase) {
        await sleepCase.measure(sleep);
    }
}
