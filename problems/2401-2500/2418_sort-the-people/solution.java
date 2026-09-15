import java.util.Arrays;

class Solution {

    public String[] sortPeople(String[] names, int[] heights) {
        // Sort indices by descending height; heights are distinct, so the
        // comparator fully orders every pair and no stability is relied on.
        Integer[] order = new Integer[names.length];
        for (int i = 0; i < names.length; ++i) {
            order[i] = i;
        }
        Arrays.sort(order, (a, b) -> heights[b] - heights[a]);
        String[] result = new String[names.length];
        for (int i = 0; i < names.length; ++i) {
            result[i] = names[order[i]];
        }
        return result;
    }
}
