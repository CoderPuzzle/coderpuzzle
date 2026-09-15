class Solution {

    public int minimumNumbers(int num, int k) {
        if (num == 0) {
            return 0;
        }
        int base = k == 0 ? 10 : k;
        for (int count = 1; count * base <= num; count++) {
            if ((num - count * base) % 10 == 0) {
                return count;
            }
        }
        return -1;
    }
}
