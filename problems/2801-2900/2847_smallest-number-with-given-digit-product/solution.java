class Solution {

    public String smallestNumber(String n) {
        // The wire carries n as decimal text; 10^18 fits easily in a long.
        long value = Long.parseLong(n);
        if (value == 1L) {
            return "1";
        }
        // Largest-first trial division packs the factors into as few
        // digits as possible and leaves the smallest remainders behind.
        int[] counts = new int[10];
        for (int digit = 9; digit >= 2; digit--) {
            while (value % digit == 0) {
                counts[digit]++;
                value /= digit;
            }
        }
        if (value != 1L) {
            return "-1";
        }
        StringBuilder answer = new StringBuilder();
        for (int digit = 2; digit <= 9; digit++) {
            for (int i = 0; i < counts[digit]; i++) {
                answer.append((char) ('0' + digit));
            }
        }
        return answer.toString();
    }
}
