function minSwaps(nums: number[]): number {
    // Sorting by (digit sum, value) fixes the target order; mapping
    // every element to its target position turns the rearrangement
    // into a permutation, and the minimum number of swaps is
    // n - (number of cycles): each cycle of length L costs L - 1.
    // The cycle walk is iterative -- n reaches 10^5, past any safe
    // recursion depth.
    const digitSum = (v: number): number => {
        let s = 0;
        for (; v > 0; v = Math.floor(v / 10)) {
            s += v % 10;
        }
        return s;
    };
    const n = nums.length;
    const order = nums
        .map((v, i) => [digitSum(v), v, i] as [number, number, number])
        .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const pos = new Array<number>(n);
    for (let target = 0; target < n; target++) {
        pos[order[target][2]] = target;
    }
    let swaps = 0;
    const visited = new Array<boolean>(n).fill(false);
    for (let i = 0; i < n; i++) {
        if (visited[i]) {
            continue;
        }
        let length = 0;
        let j = i;
        while (!visited[j]) {
            visited[j] = true;
            j = pos[j];
            length++;
        }
        swaps += length - 1;
    }
    return swaps;
}
