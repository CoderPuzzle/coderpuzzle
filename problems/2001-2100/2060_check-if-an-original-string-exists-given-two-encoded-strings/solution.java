import java.util.HashMap;
import java.util.Map;

class Solution {

    public boolean possiblyEquals(String s1, String s2) {
        return search(0, 0, 0, s1, s2, new HashMap<>());
    }

    private boolean search(int i, int j, int difference, String s1, String s2, Map<String, Boolean> memo) {
        String key = i + "," + j + "," + difference;
        if (memo.containsKey(key)) {
            return memo.get(key);
        }
        if (i == s1.length() && j == s2.length()) {
            return difference == 0;
        }

        if (i < s1.length() && Character.isDigit(s1.charAt(i))) {
            int value = 0;
            for (int end = i; end < s1.length() && end < i + 3 && Character.isDigit(s1.charAt(end)); end++) {
                value = value * 10 + s1.charAt(end) - '0';
                if (search(end + 1, j, difference + value, s1, s2, memo)) {
                    memo.put(key, true);
                    return true;
                }
            }
        }

        if (j < s2.length() && Character.isDigit(s2.charAt(j))) {
            int value = 0;
            for (int end = j; end < s2.length() && end < j + 3 && Character.isDigit(s2.charAt(end)); end++) {
                value = value * 10 + s2.charAt(end) - '0';
                if (search(i, end + 1, difference - value, s1, s2, memo)) {
                    memo.put(key, true);
                    return true;
                }
            }
        }

        boolean answer = false;
        if (difference > 0 && j < s2.length() && Character.isLetter(s2.charAt(j))) {
            answer = search(i, j + 1, difference - 1, s1, s2, memo);
        } else if (difference < 0 && i < s1.length() && Character.isLetter(s1.charAt(i))) {
            answer = search(i + 1, j, difference + 1, s1, s2, memo);
        } else if (
            difference == 0 &&
            i < s1.length() &&
            j < s2.length() &&
            Character.isLetter(s1.charAt(i)) &&
            Character.isLetter(s2.charAt(j)) &&
            s1.charAt(i) == s2.charAt(j)
        ) {
            answer = search(i + 1, j + 1, 0, s1, s2, memo);
        }
        memo.put(key, answer);
        return answer;
    }
}
