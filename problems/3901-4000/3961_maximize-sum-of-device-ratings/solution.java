class Solution {

    public long maxRatings(int[][] units) {
        if (units[0].length == 1) {
            long answer = 0;
            for (int[] device : units) answer += device[0];
            return answer;
        }

        int globalMinimum = Integer.MAX_VALUE;
        int smallestSecond = Integer.MAX_VALUE;
        long secondSum = 0;
        for (int[] device : units) {
            int first = Integer.MAX_VALUE;
            int second = Integer.MAX_VALUE;
            for (int capacity : device) {
                if (capacity < first) {
                    second = first;
                    first = capacity;
                } else if (capacity < second) {
                    second = capacity;
                }
            }
            globalMinimum = Math.min(globalMinimum, first);
            smallestSecond = Math.min(smallestSecond, second);
            secondSum += second;
        }
        return secondSum - smallestSecond + globalMinimum;
    }
}
