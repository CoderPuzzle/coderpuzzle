import java.util.ArrayList;
import java.util.List;

class Solution {

    public String reformat(String s) {
        List<Character> letters = new ArrayList<>();
        List<Character> digits = new ArrayList<>();
        for (char c : s.toCharArray()) {
            if (c >= '0' && c <= '9') {
                digits.add(c);
            } else {
                letters.add(c);
            }
        }
        if (Math.abs(letters.size() - digits.size()) > 1) {
            return "";
        }
        List<Character> first = letters.size() >= digits.size() ? letters : digits;
        List<Character> second = first == letters ? digits : letters;
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < first.size(); i++) {
            result.append(first.get(i));
            if (i < second.size()) {
                result.append(second.get(i));
            }
        }
        return result.toString();
    }
}
