class Solution {

    public String maxSumOfSquares(int num, int sum) {
        // Even nine in every position falls short: no good integer exists.
        if (sum > 9 * num) {
            return "";
        }
        // The optimal digits are forced — floor(sum / 9) nines plus at most
        // one leftover r — and descending order is the largest arrangement,
        // so lay them out from the left and pad with zeros.
        int q = sum / 9,
            r = sum % 9;
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < q; i++) {
            result.append('9');
        }
        if (r > 0) {
            result.append((char) ('0' + r));
        }
        while (result.length() < num) {
            result.append('0');
        }
        return result.toString();
    }
}
