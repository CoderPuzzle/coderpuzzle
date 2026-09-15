class Solution {

    public int[] sortArrayByParity(int[] nums) {
        // The judge pins one exact answer: the even values in the order they
        // appear, then the odd values in the order they appear. The answer
        // array of the same length is filled by two sweeps of nums — the
        // evens first, then the odds — each sweep keeping input order, which
        // writes the same concatenation without intermediate lists.
        int[] answer = new int[nums.length];
        int next = 0;
        for (int value : nums) {
            if (value % 2 == 0) {
                answer[next++] = value;
            }
        }
        for (int value : nums) {
            if (value % 2 != 0) {
                answer[next++] = value;
            }
        }
        return answer;
    }
}
