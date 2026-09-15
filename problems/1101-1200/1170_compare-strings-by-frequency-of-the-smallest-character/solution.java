import java.util.Arrays;

class Solution {

    private int f(String s) {
        // Smallest character of the string, then how often it appears.
        char smallest = s.charAt(0);
        for (int i = 1; i < s.length(); i++) {
            if (s.charAt(i) < smallest) {
                smallest = s.charAt(i);
            }
        }
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == smallest) {
                count++;
            }
        }
        return count;
    }

    public int[] numSmallerByFrequency(String[] queries, String[] words) {
        int[] freqs = new int[words.length];
        for (int i = 0; i < words.length; i++) {
            freqs[i] = f(words[i]);
        }
        Arrays.sort(freqs);
        int[] answer = new int[queries.length];
        for (int i = 0; i < queries.length; i++) {
            int p = f(queries[i]);
            // Everything strictly above p forms one sorted suffix; find
            // where it starts.
            int lo = 0,
                hi = freqs.length;
            while (lo < hi) {
                int mid = (lo + hi) >>> 1;
                if (freqs[mid] <= p) {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            answer[i] = freqs.length - lo;
        }
        return answer;
    }
}
