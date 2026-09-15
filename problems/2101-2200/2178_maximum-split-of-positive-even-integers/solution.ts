function maximumEvenSplit(finalSum: number): number[] {
    // An odd total can never be a sum of even numbers. Take the smallest
    // evens while the leftover allows a strictly larger final part.
    // finalSum reaches 10^10, within the safe-integer range of JS numbers.
    if (finalSum % 2 !== 0) {
        return [];
    }
    const parts: number[] = [];
    let take = 2;
    let remaining = finalSum;
    while (remaining - take > take) {
        parts.push(take);
        remaining -= take;
        take += 2;
    }
    parts.push(remaining);
    return parts;
}
