/**
 * Your SmallerNumbersThanCurrent object will be instantiated and called as such:
 * var obj = new SmallerNumbersThanCurrent()
 * obj.smallerNumbersThanCurrent(nums)
 */
class SmallerNumbersThanCurrent {
    constructor() {}

    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    smallerNumbersThanCurrent(nums) {
        const counts = new Array(101).fill(0);
        for (const v of nums) counts[v] += 1;
        for (let v = 1; v <= 100; v++) counts[v] += counts[v - 1];
        const below = new Array(101).fill(0);
        for (let v = 1; v <= 100; v++) below[v] = counts[v - 1];
        return nums.map((v) => below[v]);
    }
}
