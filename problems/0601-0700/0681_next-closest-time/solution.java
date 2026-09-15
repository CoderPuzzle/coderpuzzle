class Solution {

    public String nextClosestTime(String time) {
        // A candidate may reuse only digits already on the clock, so at
        // most 4^4 = 256 four-digit drawings cover everything. Keep the
        // drawings that are real clock times (hour < 24, minute < 60) and
        // pick the one whose wrapped lead over the input, (candidate -
        // input) mod 1440, is smallest. Seeding the answer with the input
        // itself at a full day's lead is the wrap: 23:59 comes around to
        // 22:22, 11:11 to itself.
        boolean[] present = new boolean[10];
        for (int i = 0; i < 5; i++) {
            if (i != 2) present[time.charAt(i) - '0'] = true;
        }
        int[] digits = new int[4];
        int count = 0;
        for (int d = 0; d < 10; d++) {
            if (present[d]) digits[count++] = d;
        }
        int start = ((time.charAt(0) - '0') * 10 + time.charAt(1) - '0') * 60;
        start += (time.charAt(3) - '0') * 10 + time.charAt(4) - '0';
        int best = start,
            bestGap = 1440;
        for (int i = 0; i < count; i++) {
            for (int j = 0; j < count; j++) {
                int hour = digits[i] * 10 + digits[j];
                if (hour >= 24) continue;
                for (int k = 0; k < count; k++) {
                    for (int l = 0; l < count; l++) {
                        int minute = digits[k] * 10 + digits[l];
                        if (minute >= 60) continue;
                        int total = hour * 60 + minute;
                        int gap = (total - start + 1440) % 1440;
                        if (gap > 0 && gap < bestGap) {
                            bestGap = gap;
                            best = total;
                        }
                    }
                }
            }
        }
        return String.format("%02d:%02d", best / 60, best % 60);
    }
}
