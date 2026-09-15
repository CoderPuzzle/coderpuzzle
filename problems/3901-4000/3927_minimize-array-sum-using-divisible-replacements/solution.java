class Solution {

    public long minArraySum(int[] nums) {
        int limit = 100000;
        boolean[] present = new boolean[limit + 1];
        for (int value : nums) {
            present[value] = true;
        }

        int[] best = new int[limit + 1];
        for (int divisor = 1; divisor <= limit; divisor++) {
            if (!present[divisor]) {
                continue;
            }
            for (int multiple = divisor; multiple <= limit; multiple += divisor) {
                if (present[multiple] && (best[multiple] == 0 || divisor < best[multiple])) {
                    best[multiple] = divisor;
                }
            }
        }

        long answer = 0;
        for (int value : nums) {
            answer += best[value];
        }
        return answer;
    }
}
