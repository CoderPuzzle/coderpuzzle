import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public long countPalindromePaths(int[] parent, String s) {
        int n = parent.length;
        List<List<Integer>> children = new ArrayList<>();
        for (int i = 0; i < n; i++) children.add(new ArrayList<>());
        for (int i = 1; i < n; i++) children.get(parent[i]).add(i);

        // mask[v]: parity bitmask of letters on the root-to-v path; a
        // multiset forms a palindrome iff at most one parity is odd, so only
        // parities matter. BFS from the root derives each child's mask as
        // its parent's XOR the edge letter's bit.
        int[] masks = new int[n];
        int[] order = new int[n];
        int cnt = 0;
        order[cnt++] = 0;
        for (int qi = 0; qi < cnt; qi++) {
            int v = order[qi];
            for (int c : children.get(v)) {
                masks[c] = masks[v] ^ (1 << (s.charAt(c) - 'a'));
                order[cnt++] = c;
            }
        }

        Map<Integer, Integer> freq = new HashMap<>();
        long ans = 0;
        for (int m : masks) {
            // Path letters between u and v have parity mask[u] ^ mask[v] —
            // the shared prefix above their LCA cancels — so partners are
            // masks equal to m (all even) or one bit away (single odd).
            // Consulting before inserting counts each pair exactly once.
            Integer c0 = freq.get(m);
            if (c0 != null) ans += c0;
            for (int b = 0; b < 26; b++) {
                Integer c1 = freq.get(m ^ (1 << b));
                if (c1 != null) ans += c1;
            }
            freq.merge(m, 1, Integer::sum);
        }
        return ans;
    }
}
