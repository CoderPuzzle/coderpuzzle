function twoSum(numbers: number[], target: number): number[] {
    // Sorted order lets two indexes converge from both ends: the smallest
    // and largest remaining values stand in for every candidate pair, and
    // no extra storage is needed, as the statement demands.
    let low = 0;
    let high = numbers.length - 1;
    while (low < high) {
        const total = numbers[low] + numbers[high];
        if (total === target) {
            // The statement's contract is 1-indexed.
            return [low + 1, high + 1];
        }
        // Too small: numbers[low] plus anything above numbers[high] only
        // shrinks, so low has no partner left.
        if (total < target) {
            ++low;
        } else {
            // Too large: numbers[high] plus anything below numbers[low] only
            // shrinks, so high has no partner left.
            --high;
        }
    }
    return [];
}
