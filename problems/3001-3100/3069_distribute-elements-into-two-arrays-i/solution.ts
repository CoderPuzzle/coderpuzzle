function resultArray(nums: number[]): number[] {
    // Literal simulation: seed arr1 with nums[0] and arr2 with nums[1],
    // then route each later element to whichever tail is greater.
    // Distinct values mean the tails never tie, so this is decisive.
    const arr1: number[] = [nums[0]];
    const arr2: number[] = [nums[1]];
    for (let i = 2; i < nums.length; ++i) {
        if (arr1[arr1.length - 1] > arr2[arr2.length - 1]) {
            arr1.push(nums[i]);
        } else {
            arr2.push(nums[i]);
        }
    }
    return [...arr1, ...arr2];
}
