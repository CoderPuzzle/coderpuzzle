class Solution {

    public long singleDivisorTriplet(int[] nums) {
        long total = 0;
        int[] freq = new int[101];
        for (int num : nums) {
            freq[num]++;
        }
        // iterate value triples directly; the freq>0 guard skips absent
        // values, so no separate present-values list is needed
        for (int a = 1; a <= 100; a++) {
            if (freq[a] == 0) {
                continue;
            }
            for (int b = a; b <= 100; b++) {
                if (freq[b] == 0) {
                    continue;
                }
                for (int c = b; c <= 100; c++) {
                    if (freq[c] == 0) {
                        continue;
                    }
                    int s = a + b + c;
                    // divisibility is checked per index, so repeated
                    // values contribute one hit per copy
                    int hits = (s % a == 0 ? 1 : 0) + (s % b == 0 ? 1 : 0) + (s % c == 0 ? 1 : 0);
                    if (hits != 1) {
                        continue;
                    }
                    if (a == b && b == c) {
                        long f = freq[a];
                        total += f * (f - 1) * (f - 2);
                    } else if (a == b || b == c) {
                        int twice = a == b ? a : b;
                        int once = a == b ? c : a;
                        long f = freq[twice];
                        total += ((f * (f - 1)) / 2) * freq[once] * 6;
                    } else {
                        total += (long) freq[a] * freq[b] * freq[c] * 6;
                    }
                }
            }
        }
        return total;
    }
}
