class Solution {

    public boolean completePrime(int num) {
        // Test every prefix and every suffix for primality with trial
        // division on the 6k +- 1 wheel. At most ten digits means at most
        // eighteen slices, and each slice costs at most ~sqrt(num) / 3
        // division steps, so no sieve is ever needed. Every slice value
        // fits int: prefixes and suffixes never exceed num <= 2^31 - 1.
        int[] digits = new int[10];
        int count = 0;
        for (int m = num; m > 0; m /= 10) digits[count++] = m % 10;
        // prefixes: the first k digits, most-significant first; suffixes:
        // the last k digits. Both scans include the whole number itself.
        for (int head = count - 1; head >= 0; head--) {
            if (!prime(num / pow10(head))) return false;
        }
        for (int k = 1; k < count; k++) {
            if (!prime(num % pow10(k))) return false;
        }
        return true;
    }

    private int pow10(int k) {
        int value = 1;
        while (k-- > 0) value *= 10;
        return value;
    }

    private boolean prime(int value) {
        if (value < 2) return false;
        if (value < 4) return true;
        if (value % 2 == 0 || value % 3 == 0) return false;
        for (long d = 5; d * d <= value; d += 6) {
            if (value % d == 0 || value % (d + 2) == 0) return false;
        }
        return true;
    }
}
