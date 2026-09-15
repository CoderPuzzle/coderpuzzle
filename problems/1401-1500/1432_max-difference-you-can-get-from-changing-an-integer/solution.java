class Solution {

    public int maxDiff(int num) {
        String s = String.valueOf(num);

        // Maximum: rewrite the first non-9 digit (and its duplicates) to 9.
        String big = s;
        for (char digit : s.toCharArray()) {
            if (digit != '9') {
                big = s.replace(digit, '9');
                break;
            }
        }

        // Minimum: the leading digit goes to 1 when it can, otherwise the
        // first digit > 1 anywhere after goes to 0.
        String small = s;
        if (s.charAt(0) != '1') {
            small = s.replace(s.charAt(0), '1');
        } else {
            for (char digit : s.toCharArray()) {
                if (digit != '0' && digit != '1') {
                    small = s.replace(digit, '0');
                    break;
                }
            }
        }

        return Integer.parseInt(big) - Integer.parseInt(small);
    }
}
