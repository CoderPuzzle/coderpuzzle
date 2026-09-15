class Solution {

    public int sumIndicesWithKSetBits(int[] nums, int k) {
        // Every value is at most 10^5 and there are at most 1000 of them,
        // so the answer stays inside a signed 32-bit int.
        int answer = 0;
        for (int index = 0; index < nums.length; index++) {
            int setBits = 0;
            for (int rest = index; rest > 0; rest &= rest - 1) {
                setBits++;
            }
            if (setBits == k) {
                answer += nums[index];
            }
        }
        return answer;
    }
}
