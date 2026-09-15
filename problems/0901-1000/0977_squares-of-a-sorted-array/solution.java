class Solution {

    public int[] sortedSquares(int[] nums) {
        // The input is sorted, so the largest remaining square always sits at
        // one of the two ends of the unprocessed window. Compare the squares
        // of the two ends, write the larger into the back of the answer, and
        // move that end inward — one pass, no sort. Ties take the left end;
        // both squares are written, one now and one in a later step.
        int[] squares = new int[nums.length];
        int left = 0;
        int right = nums.length - 1;
        for (int position = nums.length - 1; position >= 0; position--) {
            int leftSquare = nums[left] * nums[left];
            int rightSquare = nums[right] * nums[right];
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
}
