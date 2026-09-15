import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[] generatePossibleNextMoves(String currentState) {
        List<String> states = new ArrayList<>();
        // One left-to-right scan: every position whose two characters are
        // both '+' is exactly one legal move, and ascending i emits the
        // states in the pinned order — the earlier flipped pair first.
        for (int i = 0; i + 1 < currentState.length(); ++i) {
            if (currentState.charAt(i) == '+' && currentState.charAt(i + 1) == '+') {
                // Keep both ends of the string, burn only the pair.
                states.add(currentState.substring(0, i) + "--" + currentState.substring(i + 2));
            }
        }
        // A string with no "++" anywhere leaves the list empty — no valid move.
        return states.toArray(new String[0]);
    }
}
