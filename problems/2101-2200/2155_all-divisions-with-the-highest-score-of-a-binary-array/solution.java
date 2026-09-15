class Solution {

    public int[] maxScoreIndices(int[] nums) {
        // score(i) = zeros in nums[:i] + ones in nums[i:]. Both addends stay
        // as running counters — ones on the right is total_ones minus the
        // ones already passed — so each of the n + 1 division points costs
        // O(1). The sweep emits indices ascending; the answer list sizes to
        // n + 1, its provable maximum, before being narrowed on return.
        int n = nums.length;
        int totalOnes = 0;
        for (int value : nums) {
            totalOnes += value;
        }
        int onesLeft = 0;
        int zerosLeft = 0;
        int best = -1;
        int[] answer = new int[n + 1];
        int size = 0;
        for (int i = 0; i <= n; i++) {
            int score = zerosLeft + totalOnes - onesLeft;
            if (score > best) {
                best = score;
                size = 0;
                answer[size++] = i;
            } else if (score == best) {
                answer[size++] = i;
            }
            if (i < n) {
                if (nums[i] == 1) {
                    onesLeft++;
                } else {
                    zerosLeft++;
                }
            }
        }
        int[] result = new int[size];
        System.arraycopy(answer, 0, result, 0, size);
        return result;
    }
}
