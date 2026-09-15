import java.util.HashMap;
import java.util.Map;

class Solution {

    public int romanToInt(String s) {
        // One left-to-right pass: every symbol contributes its value, except
        // the left half of a subtractive pair, which is taken away instead.
        Map<Character, Integer> values = new HashMap<>();
        values.put('I', 1);
        values.put('V', 5);
        values.put('X', 10);
        values.put('L', 50);
        values.put('C', 100);
        values.put('D', 500);
        values.put('M', 1000);
        int total = 0;
        for (int i = 0; i < s.length(); ++i) {
            int value = values.get(s.charAt(i));
            // A value smaller than its right neighbor marks one of the six
            // subtractive pairs (IV, IX, XL, XC, CD, CM): the pair is worth
            // right - left, so this symbol is subtracted rather than added.
            // The last symbol has no right neighbor and is always added.
            if (i + 1 < s.length() && value < values.get(s.charAt(i + 1))) {
                total -= value;
            } else {
                total += value;
            }
        }
        return total;
    }
}
