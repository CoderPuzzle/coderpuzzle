class Solution {

    public int numberCount(int a, int b) {
        int count = 0;
        for (int value = a; value <= b; value++) {
            if (hasUniqueDigits(value)) {
                count++;
            }
        }
        return count;
    }

    private boolean hasUniqueDigits(int value) {
        int seen = 0;
        while (value > 0) {
            int bit = 1 << (value % 10);
            if ((seen & bit) != 0) {
                return false;
            }
            seen |= bit;
            value /= 10;
        }
        return true;
    }
}
