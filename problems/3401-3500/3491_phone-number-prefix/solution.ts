function phonePrefix(numbers: string[]): boolean {
    // In sorted order a prefix relationship must surface between
    // neighbors: the shorter prefix sorts first, and anything
    // landing between them shares that prefix as well.
    const sorted = numbers.slice().sort();
    for (let i = 0; i + 1 < sorted.length; i++) {
        if (sorted[i + 1].startsWith(sorted[i])) {
            return false;
        }
    }
    return true;
}
