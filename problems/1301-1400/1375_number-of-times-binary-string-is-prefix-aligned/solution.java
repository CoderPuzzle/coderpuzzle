class Solution {

    public int numTimesAllBlue(int[] flips) {
        int rightmost = 0;
        int count = 0;
        for (int i = 0; i < flips.length; i++) {
            rightmost = Math.max(rightmost, flips[i]);
            if (rightmost == i + 1) count += 1;
        }
        return count;
    }
}
