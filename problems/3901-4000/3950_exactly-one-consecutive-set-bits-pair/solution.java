class Solution {

    public boolean consecutiveSetBits(int n) {
        int pairs = 0;
        int previous = 0;
        while (n > 0) {
            int current = n & 1;
            if (current == 1 && previous == 1) {
                pairs++;
                if (pairs > 1) {
                    return false;
                }
            }
            previous = current;
            n >>= 1;
        }
        return pairs == 1;
    }
}
