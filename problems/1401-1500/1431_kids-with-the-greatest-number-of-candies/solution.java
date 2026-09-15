class Solution {

    public boolean[] kidsWithCandies(int[] candies, int extraCandies) {
        int maximum = candies[0];
        for (int count : candies) {
            maximum = Math.max(maximum, count);
        }
        boolean[] result = new boolean[candies.length];
        for (int i = 0; i < candies.length; i++) {
            result[i] = candies[i] + extraCandies >= maximum;
        }
        return result;
    }
}
