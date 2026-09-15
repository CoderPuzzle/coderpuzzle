function containsDuplicate(nums: number[]): boolean {
    // Sorting drags equal values next to each other, so a duplicate
    // anywhere in the array turns into a matching neighbouring pair.
    const ordered: number[] = [...nums].sort((a, b) => a - b);
    for (let i = 1; i < ordered.length; i++) {
        // After sorting only neighbours can be equal, so one comparison
        // per gap rules out every pair that might match.
        if (ordered[i - 1] === ordered[i]) {
            return true;
        }
    }
    // Every gap held two different values: nothing repeats.
    return false;
}
