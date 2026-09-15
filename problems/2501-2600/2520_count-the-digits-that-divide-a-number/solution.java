class Solution {

    public int countDigits(int num) {
        // Peel digits off the low end with % 10 / / 10 and test each one
        // against the untouched original. The input guarantees no zero
        // digit, so every divisor test is safe.
        int count = 0;
        for (int rest = num; rest > 0; rest /= 10) if (num % (rest % 10) == 0) ++count;
        return count;
    }
}
