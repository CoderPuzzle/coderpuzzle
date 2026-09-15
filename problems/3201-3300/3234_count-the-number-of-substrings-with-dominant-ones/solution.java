class Solution {

    public long numberOfSubstrings(String s) {
        int n = s.length();
        int[] zerosAt = new int[n];
        int totalZeros = 0;
        for (int index = 0; index < n; index++) {
            if (s.charAt(index) == '0') {
                zerosAt[totalZeros++] = index;
            }
        }
        long answer = 0;
        int firstZero = 0;
        for (int left = 0; left < n; left++) {
            while (firstZero < totalZeros && zerosAt[firstZero] < left) {
                firstZero++;
            }
            if (firstZero < totalZeros) {
                answer += zerosAt[firstZero] - left;
            } else {
                answer += n - left;
            }
            long need = 1;
            int j = 1;
            while (need <= n - left && firstZero + j - 1 < totalZeros) {
                long low = zerosAt[firstZero + j - 1];
                long required = (long) left + need;
                if (required > low) {
                    low = required;
                }
                long high = firstZero + j < totalZeros ? zerosAt[firstZero + j] : n;
                if (high > low) {
                    answer += high - low;
                }
                j++;
                need += 2L * j;
            }
        }
        return answer;
    }
}
