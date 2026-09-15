import java.util.ArrayList;
import java.util.List;

class Solution {

    public String clearStars(String s) {
        // Each '*' removes the newest surviving copy of the smallest letter
        // seen so far; deleting anything larger, or an older copy of that
        // letter, can only leave a bigger remainder behind.
        List<List<Integer>> slots = new ArrayList<>();
        for (int c = 0; c < 26; c++) {
            slots.add(new ArrayList<>());
        }
        boolean[] dropped = new boolean[s.length()];
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch == '*') {
                dropped[i] = true;
                for (int c = 0; c < 26; c++) {
                    List<Integer> slot = slots.get(c);
                    if (!slot.isEmpty()) {
                        dropped[slot.remove(slot.size() - 1)] = true;
                        break;
                    }
                }
            } else {
                slots.get(ch - 'a').add(i);
            }
        }
        StringBuilder kept = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            if (!dropped[i]) {
                kept.append(s.charAt(i));
            }
        }
        return kept.toString();
    }
}
