import java.util.HashSet;
import java.util.Set;

class Solution {

    public int shortestSequence(int[] rolls, int k) {
        // A "complete window" (all k faces seen since the last reset)
        // extends coverage to sequences one roll longer.
        Set<Integer> seen = new HashSet<>();
        // answer = (#complete windows so far) + 1; starts at 1 because with
        // zero windows some face never rolled, so length 1 already fails.
        int answer = 1;
        for (int r : rolls) {
            seen.add(r);
            if (seen.size() == k) {
                // Window complete: whatever prefix was matched inside it,
                // every next symbol is available after this point.
                answer += 1;
                seen.clear();
            }
        }
        // No complete set of faces remains, so a sequence of this length
        // cannot be matched as a subsequence.
        return answer;
    }
}
