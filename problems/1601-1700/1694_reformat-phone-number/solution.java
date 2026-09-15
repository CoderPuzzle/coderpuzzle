import java.util.ArrayList;
import java.util.List;

class Solution {

    public String reformatNumber(String number) {
        // Strip the separators, then group by remaining length: while more
        // than 4 digits remain, cut a block of 3; the final 4, 3, or 2
        // digits are forced — 4 splits into two blocks of 2, the rest
        // stay whole.
        StringBuilder digits = new StringBuilder();
        for (int i = 0; i < number.length(); i++) {
            char c = number.charAt(i);
            if (Character.isDigit(c)) {
                digits.append(c);
            }
        }
        List<String> blocks = new ArrayList<>();
        int i = 0;
        while (digits.length() - i > 4) {
            blocks.add(digits.substring(i, i + 3));
            i += 3;
        }
        String tail = digits.substring(i);
        if (tail.length() == 4) {
            blocks.add(tail.substring(0, 2));
            blocks.add(tail.substring(2));
        } else {
            blocks.add(tail);
        }
        return String.join("-", blocks);
    }
}
