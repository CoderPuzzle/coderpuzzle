import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public int[][] threeSum(int[] nums) {
        // Triples are collected as sorted value lists in a set, so a value
        // triple that closes at several positions arrives several times but
        // is kept once.
        Set<List<Integer>> triples = new HashSet<>();
        // Pin each distinct value once, at its first occurrence: the suffix
        // behind the first occurrence is a superset of every later one, so
        // no distinct triple is lost and identical re-scans are skipped.
        Set<Integer> pinned = new HashSet<>();
        for (int i = 0; i + 2 < nums.length; i++) {
            int first = nums[i];
            // add reports false when the value was already pinned.
            if (!pinned.add(first)) {
                continue;
            }
            // Values already passed in this suffix. A complement found here
            // sits strictly between i and the closing element, so the three
            // values occupy three different positions.
            Set<Integer> seen = new HashSet<>();
            for (int j = i + 1; j < nums.length; j++) {
                int complement = -(first + nums[j]);
                if (seen.contains(complement)) {
                    int[] triple = { first, complement, nums[j] };
                    Arrays.sort(triple);
                    triples.add(Arrays.asList(triple[0], triple[1], triple[2]));
                }
                seen.add(nums[j]);
            }
        }
        List<List<Integer>> ordered = new ArrayList<>(triples);
        // The hash walk has no order of its own, so one final sort buys what
        // the sorted walk gives the two-pointer variant for free: each
        // triple's values ascending, the triples themselves lexicographic.
        ordered.sort((x, y) -> {
            for (int k = 0; k < 3; k++) {
                int comparison = Integer.compare(x.get(k), y.get(k));
                if (comparison != 0) {
                    return comparison;
                }
            }
            return 0;
        });
        int[][] result = new int[ordered.size()][];
        for (int k = 0; k < ordered.size(); k++) {
            List<Integer> triple = ordered.get(k);
            result[k] = new int[] { triple.get(0), triple.get(1), triple.get(2) };
        }
        return result;
    }
}
