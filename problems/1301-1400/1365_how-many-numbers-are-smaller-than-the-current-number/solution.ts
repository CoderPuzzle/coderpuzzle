class SmallerNumbersThanCurrent {
    constructor() {}

    smallerNumbersThanCurrent(nums: number[]): number[] {
        const counts = new Array<number>(101).fill(0);
        for (const v of nums) counts[v] += 1;
        for (let v = 1; v <= 100; v++) counts[v] += counts[v - 1];
        const below = new Array<number>(101).fill(0);
        for (let v = 1; v <= 100; v++) below[v] = counts[v - 1];
        return nums.map((v) => below[v]);
    }
}
