import java.util.*;

class Solution {

    public int maxChunksToSorted(int[] arr) {
        // A boundary is legal exactly when the multiset of arr's prefix
        // equals the sorted copy's prefix — values repeat, so multisets,
        // not max/min ranges, decide.
        int[] ordered = arr.clone();
        Arrays.sort(ordered);
        Map<Integer, Integer> counts = new HashMap<>();
        int balance = 0;
        int chunks = 0;
        for (int i = 0; i < arr.length; i++) {
            int a = arr[i],
                b = ordered[i];
            // Each update adds +1 when it leaves a count nonzero (a new
            // unpaired element) and -1 when it brings one back to zero.
            int ca = counts.getOrDefault(a, 0) + 1;
            counts.put(a, ca);
            balance += ca > 0 ? 1 : -1;
            int cb = counts.getOrDefault(b, 0) - 1;
            counts.put(b, cb);
            balance += cb < 0 ? 1 : -1;
            // Zero balance = no unpaired elements: the prefix multisets
            // agree, so cut a chunk at the earliest such index.
            if (balance == 0) chunks++;
        }
        return chunks;
    }
}
