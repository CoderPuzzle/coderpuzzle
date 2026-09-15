// The input is sorted, so the largest remaining square always sits at one of
// the two ends of the unprocessed window. Compare the squares of the two
// ends, write the larger into the back of the answer, and move that end
// inward — one pass, no sort. Ties take the left end; both squares are
// written, one now and one in a later step.
function sortedSquares(nums: number[]): number[] {
    const squares: number[] = new Array(nums.length);
    let left = 0;
    let right = nums.length - 1;
    for (let position = nums.length - 1; position >= 0; position--) {
        const leftSquare = nums[left] * nums[left];
        const rightSquare = nums[right] * nums[right];
        if (leftSquare >= rightSquare) {
            squares[position] = leftSquare;
            left++;
        } else {
            squares[position] = rightSquare;
            right--;
        }
    }
    return squares;
}
