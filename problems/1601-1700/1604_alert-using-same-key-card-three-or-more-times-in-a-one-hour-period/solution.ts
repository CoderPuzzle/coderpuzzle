function alertNames(keyName: string[], keyTime: string[]): string[] {
    // Group each worker's swipe times together; comparisons only ever
    // happen within one worker's own history.
    const timesByName = new Map<string, number[]>();
    for (let i = 0; i < keyName.length; i++) {
        const hours = Number(keyTime[i].slice(0, 2));
        const minutes = Number(keyTime[i].slice(3, 5));
        // Every swipe falls on a single day, so minutes-since-midnight is
        // all the arithmetic needed — no wraparound to handle.
        const total = 60 * hours + minutes;
        if (!timesByName.has(keyName[i])) {
            timesByName.set(keyName[i], []);
        }
        timesByName.get(keyName[i])!.push(total);
    }

    const alerted: string[] = [];
    for (const [name, times] of timesByName) {
        times.sort((a, b) => a - b);
        // A window of three consecutive swipes spans at most 60 minutes
        // exactly when the alert condition is met.
        for (let i = 0; i + 2 < times.length; i++) {
            if (times[i + 2] - times[i] <= 60) {
                alerted.push(name);
                break;
            }
        }
    }

    alerted.sort();
    return alerted;
}
