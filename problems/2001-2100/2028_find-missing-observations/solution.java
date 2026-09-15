class Solution {

    public int[] missingRolls(int[] rolls, int mean, int n) {
        long observedSum = 0;
        for (int roll : rolls) {
            observedSum += roll;
        }

        long required = (long) mean * (rolls.length + n) - observedSum;
        if (required < n || required > 6L * n) {
            return new int[] {};
        }

        int base = (int) (required / n);
        int remainder = (int) (required % n);
        int[] missing = new int[n];
        for (int i = 0; i < n; ++i) {
            missing[i] = base + (i < remainder ? 1 : 0);
        }
        return missing;
    }
}
