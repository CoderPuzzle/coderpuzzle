class Solution {

    public int maximumXOR(int[] nums) {
        int answer = 0;
        for (int value : nums) {
            answer |= value;
        }
        return answer;
    }
}
