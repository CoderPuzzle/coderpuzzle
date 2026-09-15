import java.util.ArrayDeque;
import java.util.HashSet;
import java.util.Queue;
import java.util.Set;

class Solution {

    public int kSimilarity(String s1, String s2) {
        // Each swap is a move between strings, so BFS from s1 yields
        // the minimum swap count.
        Queue<String[]> queue = new ArrayDeque<>();
        Set<String> seen = new HashSet<>();
        queue.add(new String[] { s1, "0" });
        seen.add(s1);
        while (!queue.isEmpty()) {
            String[] cur = queue.poll();
            String s = cur[0];
            int steps = Integer.parseInt(cur[1]);
            if (s.equals(s2)) {
                return steps;
            }
            // Always fix the leftmost mismatch first: some optimal
            // solution does, and the rule prunes the branching.
            int i = 0;
            while (s.charAt(i) == s2.charAt(i)) {
                i++;
            }
            char[] arr = s.toCharArray();
            for (int j = i + 1; j < s.length(); j++) {
                // Install s2's letter at i, and never break an
                // already-matching j — such a swap is never minimal.
                if (arr[j] == s2.charAt(i) && arr[j] != s2.charAt(j)) {
                    arr[i] = s.charAt(j);
                    arr[j] = s.charAt(i);
                    String ns = new String(arr);
                    arr[i] = s.charAt(i);
                    arr[j] = s.charAt(j);
                    // Only novel strings join the queue; matched
                    // positions are never touched again.
                    if (seen.add(ns)) {
                        queue.add(new String[] { ns, String.valueOf(steps + 1) });
                    }
                }
            }
        }
        // Unreachable: anagrams are always convertible.
        return -1;
    }
}
