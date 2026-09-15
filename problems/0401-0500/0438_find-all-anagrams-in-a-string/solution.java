import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] findAnagrams(String s, String p) {
        int length = p.length();
        int n = s.length();
        List<Integer> result = new ArrayList<>();
        if (n < length) return new int[0];
        int[] delta = new int[128];
        for (int i = 0; i < length; i++) delta[p.charAt(i)]++;
        int diff = 0;
        for (int d : delta) if (d != 0) diff++;
        for (int i = 0; i < n; i++) {
            int c = s.charAt(i);
            if (delta[c] == 0) diff++;
            delta[c]--;
            if (delta[c] == 0) diff--;
            if (i >= length) {
                int out = s.charAt(i - length);
                if (delta[out] == 0) diff++;
                delta[out]++;
                if (delta[out] == 0) diff--;
            }
            if (i >= length - 1 && diff == 0) result.add(i - length + 1);
        }
        int[] answer = new int[result.size()];
        for (int i = 0; i < result.size(); i++) answer[i] = result.get(i);
        return answer;
    }
}
