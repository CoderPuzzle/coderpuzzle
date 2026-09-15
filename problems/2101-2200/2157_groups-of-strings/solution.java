import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

class Solution {

    private int[] parent;

    private int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    public int[] groupStrings(String[] words) {
        Map<Integer, Integer> maskCounter = new HashMap<>();
        for (String w : words) {
            int mask = 0;
            for (int k = 0; k < w.length(); k++) {
                mask |= 1 << (w.charAt(k) - 'a');
            }
            maskCounter.merge(mask, 1, Integer::sum);
        }

        List<Integer> maskList = new ArrayList<>(maskCounter.keySet());
        int sz = maskList.size();
        Map<Integer, Integer> index = new HashMap<>();
        for (int k = 0; k < sz; k++) {
            index.put(maskList.get(k), k);
        }
        parent = new int[sz];
        int[] sizeCount = new int[sz];
        for (int k = 0; k < sz; k++) {
            parent[k] = k;
            sizeCount[k] = maskCounter.get(maskList.get(k));
        }

        int full = (1 << 26) - 1;
        for (int k = 0; k < sz; k++) {
            int mask = maskList.get(k);
            // Add / delete one letter: masks differing in exactly one bit.
            for (int bit = 0; bit < 26; bit++) {
                int neighbor = mask ^ (1 << bit);
                Integer ni = index.get(neighbor);
                if (ni != null) {
                    unionIdx(k, ni, sizeCount);
                }
            }
            // Replace one letter: remove a present bit, add an absent bit.
            int absent = full & ~mask;
            int removable = mask;
            while (removable != 0) {
                int low = removable & -removable;
                removable ^= low;
                int base = mask & ~low;
                int addable = absent;
                while (addable != 0) {
                    int low2 = addable & -addable;
                    addable ^= low2;
                    int neighbor = base | low2;
                    Integer ni = index.get(neighbor);
                    if (ni != null) {
                        unionIdx(k, ni, sizeCount);
                    }
                }
            }
        }

        Set<Integer> roots = new HashSet<>();
        for (int k = 0; k < sz; k++) {
            roots.add(find(k));
        }
        int largest = 0;
        for (int k = 0; k < sz; k++) {
            if (find(k) == k) {
                largest = Math.max(largest, sizeCount[k]);
            }
        }
        return new int[] { roots.size(), largest };
    }

    private void unionIdx(int a, int b, int[] sizeCount) {
        int ra = find(a),
            rb = find(b);
        if (ra != rb) {
            parent[rb] = ra;
            sizeCount[ra] += sizeCount[rb];
        }
    }
}
