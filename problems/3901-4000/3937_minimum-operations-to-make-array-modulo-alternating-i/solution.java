class Solution {

    public int minOperations(int[] nums, int k) {
        int[] remainders = new int[nums.length];
        for (int i = 0; i < nums.length; i++) {
            remainders[i] = nums[i] % k;
        }
        int answer = Integer.MAX_VALUE;
        for (int x = 0; x < k; x++) {
            for (int y = 0; y < k; y++) {
                if (x == y) {
                    continue;
                }
                int total = 0;
                for (int i = 0; i < remainders.length; i++) {
                    int target = i % 2 == 0 ? x : y;
                    int current = remainders[i];
                    total += Math.min((target - current + k) % k, (current - target + k) % k);
                }
                answer = Math.min(answer, total);
            }
        }
        return answer;
    }
}
