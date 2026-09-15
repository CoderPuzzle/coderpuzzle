function movesToMakeZigzag(nums: number[]): number {
    const cost = (valleyParity: number): number => {
        let moves = 0;
        for (let i = valleyParity; i < nums.length; i += 2) {
            // Valley must drop below both neighbors; the neighbors are
            // peaks of the other parity and never get decreased.
            let bound = Infinity;
            if (i > 0) bound = Math.min(bound, nums[i - 1]);
            if (i + 1 < nums.length) bound = Math.min(bound, nums[i + 1]);
            if (nums[i] >= bound) moves += nums[i] - bound + 1;
        }
        return moves;
    };
    return Math.min(cost(0), cost(1));
}
