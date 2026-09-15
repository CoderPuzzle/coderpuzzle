class Solution {

    public int minMaxGame(int[] nums) {
        int[] current = nums;
        while (current.length > 1) {
            int[] nextValues = new int[current.length / 2];
            for (int i = 0; i < nextValues.length; i++) {
                if (i % 2 == 0) {
                    nextValues[i] = Math.min(current[2 * i], current[2 * i + 1]);
                } else {
                    nextValues[i] = Math.max(current[2 * i], current[2 * i + 1]);
                }
            }
            current = nextValues;
        }
        return current[0];
    }
}
