class Solution {

    public String reverseByType(String s) {
        // The two reversals act on disjoint position sets — a slot that
        // starts on a letter ends on a letter — so each class can be
        // reversed independently, in place. Each pass walks two pointers
        // inward from the ends, skipping characters outside the class
        // being reversed, and swaps when both sides are on the class.
        char[] chars = s.toCharArray();
        int n = chars.length;

        int i = 0;
        int j = n - 1;
        while (i < j) {
            if (!isLetter(chars[i])) {
                i++;
            } else if (!isLetter(chars[j])) {
                j--;
            } else {
                char t = chars[i];
                chars[i] = chars[j];
                chars[j] = t;
                i++;
                j--;
            }
        }

        i = 0;
        j = n - 1;
        while (i < j) {
            if (isLetter(chars[i])) {
                i++;
            } else if (isLetter(chars[j])) {
                j--;
            } else {
                char t = chars[i];
                chars[i] = chars[j];
                chars[j] = t;
                i++;
                j--;
            }
        }
        return new String(chars);
    }

    private boolean isLetter(char c) {
        return c >= 'a' && c <= 'z';
    }
}
