class Solution {

    public int minCost(String colors, int[] neededTime) {
        int total = 0;
        int runSum = neededTime[0];
        int runMax = neededTime[0];
        for (int i = 1; i < colors.length(); i++) {
            if (colors.charAt(i) == colors.charAt(i - 1)) {
                runSum += neededTime[i];
                runMax = Math.max(runMax, neededTime[i]);
            } else {
                total += runSum - runMax;
                runSum = neededTime[i];
                runMax = neededTime[i];
            }
        }
        total += runSum - runMax;
        return total;
    }
}
