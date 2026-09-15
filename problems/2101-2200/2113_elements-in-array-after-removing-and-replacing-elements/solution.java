class Solution {

    public int[] elementInNums(int[] nums, int[][] queries) {
        int length = nums.length;
        int cycle = 2 * length;
        int[] answer = new int[queries.length];
        for (int queryIndex = 0; queryIndex < queries.length; queryIndex++) {
            int phase = queries[queryIndex][0] % cycle;
            int index = queries[queryIndex][1];
            if (phase < length) {
                int originalIndex = phase + index;
                answer[queryIndex] = originalIndex < length ? nums[originalIndex] : -1;
            } else {
                int restored = phase - length;
                answer[queryIndex] = index < restored ? nums[index] : -1;
            }
        }
        return answer;
    }
}
