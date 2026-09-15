import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public int largestInteger(int num) {
        char[] digits = Integer.toString(num).toCharArray();
        List<Character> odds = new ArrayList<>();
        List<Character> evens = new ArrayList<>();
        for (char ch : digits) {
            ((ch - '0') % 2 == 1 ? odds : evens).add(ch);
        }
        Collections.sort(odds, Collections.reverseOrder());
        Collections.sort(evens, Collections.reverseOrder());
        StringBuilder out = new StringBuilder(digits.length);
        int oddIndex = 0;
        int evenIndex = 0;
        for (char ch : digits) {
            if ((ch - '0') % 2 == 1) {
                out.append(odds.get(oddIndex++));
            } else {
                out.append(evens.get(evenIndex++));
            }
        }
        return Integer.parseInt(out.toString());
    }
}
