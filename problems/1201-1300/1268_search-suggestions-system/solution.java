import java.util.Arrays;

class Solution {

    public String[][] suggestedProducts(String[] products, String searchWord) {
        // lexicographic order makes every shared prefix a contiguous run
        String[] sorted = products.clone();
        Arrays.sort(sorted);
        String[][] result = new String[searchWord.length()][];
        // grow the prefix one typed character at a time
        StringBuilder sb = new StringBuilder();
        for (int t = 0; t < searchWord.length(); t++) {
            sb.append(searchWord.charAt(t));
            String prefix = sb.toString();
            // lower bound: where the run of words >= prefix begins
            int lo = 0,
                hi = sorted.length;
            while (lo < hi) {
                int mid = (lo + hi) >>> 1;
                if (sorted[mid].compareTo(prefix) < 0) lo = mid + 1;
                else hi = mid;
            }
            // first three of the run; the loop stops at the first word not
            // sharing the prefix, so cost is independent of run length
            int count = 0;
            while (lo + count < sorted.length && count < 3 && sorted[lo + count].startsWith(prefix)) {
                count++;
            }
            String[] suggestions = new String[count];
            for (int i = 0; i < count; i++) suggestions[i] = sorted[lo + i];
            result[t] = suggestions;
        }
        return result;
    }
}
