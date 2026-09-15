function majorityElement(nums: number[]): number {
    // Sorting turns the count into a position: equal values form one run, the
    // majority's run is longer than half the array, and a run that long always
    // covers the middle index n / 2. The comparator is numeric — the default
    // sort orders strings.
    const ordered = [...nums].sort((a, b) => a - b);
    // Whatever order the input arrived in, the middle of the sorted order is
    // the majority.
    return ordered[Math.floor(ordered.length / 2)];
}
