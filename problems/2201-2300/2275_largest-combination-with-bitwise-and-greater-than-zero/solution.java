class Solution {

    public int largestCombination(int[] candidates) {
        int[] counts = new int[24];
        for (int value : candidates) {
            for (int bit = 0; bit < 24; bit++) {
                if (((value >> bit) & 1) == 1) {
                    counts[bit]++;
                }
            }
        }
        int answer = 0;
        for (int count : counts) {
            if (count > answer) {
                answer = count;
            }
        }
        return answer;
    }
}
