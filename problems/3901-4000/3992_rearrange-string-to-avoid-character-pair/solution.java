import java.util.Arrays;

class Solution {

    public String rearrangeString(String s, String x, String y) {
        char[] letters = s.toCharArray();
        Arrays.sort(letters); // groups equal letters into one block each
        if (x.charAt(0) < y.charAt(0)) {
            for (int i = 0, j = letters.length - 1; i < j; i++, j--) {
                char tmp = letters[i];
                letters[i] = letters[j];
                letters[j] = tmp;
            }
        }
        return new String(letters);
    }
}
