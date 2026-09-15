function twoSum(numbers: number[], target: number): number[] {
    let left = 0,
        right = numbers.length - 1;
    while (left < right) {
        const total = numbers[left] + numbers[right];
        // 1-based indices as the problem expects.
        if (total === target) return [left + 1, right + 1];
        // Too small: pairing numbers[left] with anything smaller than
        // numbers[right] only lowers the sum — retire the left value.
        if (total < target) ++left;
        // Too large: retire the right value symmetrically.
        else --right;
    }
    // Unreachable under the uniqueness promise; keeps the function total.
    return [];
}
