class Solution {

    public String largestPalindromic(String num) {
        // Spend each digit's full pairs into the left half, highest
        // digit first; the largest odd-count digit becomes the center.
        // Zero pairs are worthless without a nonzero digit ahead of
        // them, so a leading-zero half is stripped; all zeros -> "0".
        int[] cnt = new int[10];
        for (int i = 0; i < num.length(); ++i) {
            ++cnt[num.charAt(i) - '0'];
        }
        StringBuilder half = new StringBuilder();
        char mid = 0;
        for (int d = 9; d >= 0; --d) {
            for (int k = cnt[d] / 2; k > 0; --k) {
                half.append((char) ('0' + d));
            }
            if (mid == 0 && cnt[d] % 2 == 1) {
                mid = (char) ('0' + d);
            }
        }
        int lead = 0;
        while (lead < half.length() && half.charAt(lead) == '0') {
            ++lead;
        }
        String h = half.substring(lead);
        if (h.isEmpty() && mid == 0) {
            return "0";
        }
        String right = new StringBuilder(h).reverse().toString();
        return h + (mid == 0 ? "" : mid) + right;
    }
}
