import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public String[] expand(String s) {
        // Parse into option groups: a bare letter is a one-element group,
        // and "{a,b,c}" becomes ["a","b","c"]. Backtrack over the choices,
        // then sort the finished words.
        List<List<String>> tokens = new ArrayList<>();
        int i = 0;
        while (i < s.length()) {
            if (s.charAt(i) == '{') {
                int j = i;
                while (s.charAt(j) != '}') j++;
                List<String> group = new ArrayList<>();
                for (String opt : s.substring(i + 1, j).split(",")) {
                    group.add(opt);
                }
                tokens.add(group);
                i = j + 1;
            } else {
                tokens.add(Collections.singletonList(String.valueOf(s.charAt(i))));
                i++;
            }
        }
        List<String> result = new ArrayList<>();
        StringBuilder cur = new StringBuilder();
        dfs(tokens, 0, cur, result);
        Collections.sort(result);
        return result.toArray(new String[0]);
    }

    private void dfs(List<List<String>> tokens, int idx, StringBuilder cur, List<String> result) {
        if (idx == tokens.size()) {
            result.add(cur.toString());
            return;
        }
        for (String opt : tokens.get(idx)) {
            int start = cur.length();
            cur.append(opt);
            dfs(tokens, idx + 1, cur, result);
            cur.setLength(start);
        }
    }
}
