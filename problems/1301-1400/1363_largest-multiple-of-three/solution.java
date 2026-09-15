class Solution {

    public String largestMultipleOfThree(int[] digits) {
        int[] counts = new int[10];
        int total = 0;
        for (int d : digits) {
            counts[d] += 1;
            total += d;
        }

        int remainder = total % 3;
        if (remainder == 1) {
            if (!drop(counts, 1, 1)) drop(counts, 2, 2);
        } else if (remainder == 2) {
            if (!drop(counts, 1, 2)) drop(counts, 2, 1);
        }

        StringBuilder sb = new StringBuilder();
        for (int d = 9; d >= 0; d--) {
            for (int i = 0; i < counts[d]; i++) sb.append((char) ('0' + d));
        }
        if (sb.length() == 0 || sb.charAt(0) == '0') {
            boolean any = false;
            for (int c : counts) any |= c != 0;
            return any ? "0" : "";
        }
        return sb.toString();
    }

    private boolean drop(int[] counts, int dropCount, int cls) {
        for (int d = cls; d <= 9; d += 3) {
            int take = Math.min(counts[d], dropCount);
            counts[d] -= take;
            dropCount -= take;
            if (dropCount == 0) return true;
        }
        return false;
    }
}
