// Stable three-way partition: gather each comparison class in its original
// order and concatenate, which preserves the relative order inside the less
// and greater groups by construction.
function pivotArray(nums: number[], pivot: number): number[] {
    const less: number[] = [];
    const equal: number[] = [];
    const greater: number[] = [];
    for (const value of nums) {
        if (value < pivot) {
            less.push(value);
        } else if (value > pivot) {
            greater.push(value);
        } else {
            equal.push(value);
        }
    }
    return [...less, ...equal, ...greater];
}
