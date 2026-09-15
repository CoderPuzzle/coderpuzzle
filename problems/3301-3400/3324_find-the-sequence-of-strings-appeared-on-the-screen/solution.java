import java.util.ArrayList;
import java.util.List;

class Solution {

    public List<String> stringSequence(String target) {
        // Minimum presses are forced: each new position starts with key 1
        // (key 2 on an empty screen is impossible), appending 'a', and key
        // 2 then advances that last character (c - 'a') times to the
        // wanted one. The screen states therefore stream out
        // deterministically — for each position, emit the string after the
        // append and again after every advance — which is exactly the
        // sequence of all strings that ever appear.
        char[] screen = new char[target.length()];
        List<String> states = new ArrayList<>();
        for (int i = 0; i < target.length(); ++i) {
            screen[i] = 'a';
            states.add(new String(screen, 0, i + 1));
            for (char c = 'b'; c <= target.charAt(i); ++c) {
                screen[i] = c;
                states.add(new String(screen, 0, i + 1));
            }
        }
        return states;
    }
}
