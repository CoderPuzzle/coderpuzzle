import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public String[][] findDuplicate(String[] paths) {
        // One scan groups every file by what it contains. Inside a directory
        // info string the directory path comes first, then its files; a file
        // token keeps its name before the first '(' and its content between
        // that '(' and the token's last ')'. Contents hold no space — the
        // space-separated tokenization could not carry one — so every file
        // lands in exactly one bucket, its path appended in scan order.
        Map<String, List<String>> groups = new LinkedHashMap<>();
        for (String info : paths) {
            String[] tokens = info.split(" ");
            String directory = tokens[0];
            for (int i = 1; i < tokens.length; i++) {
                String token = tokens[i];
                int openAt = token.indexOf('(');
                int closeAt = token.lastIndexOf(')');
                String name = token.substring(0, openAt);
                String content = token.substring(openAt + 1, closeAt);
                groups.computeIfAbsent(content, k -> new ArrayList<>()).add(directory + "/" + name);
            }
        }
        List<String> contents = new ArrayList<>(groups.keySet());
        // A bucket answers the question only once a second file joins it; the
        // pinned order lists the survivors by content, descending.
        Collections.sort(contents, Collections.reverseOrder());
        List<String[]> results = new ArrayList<>();
        for (String content : contents) {
            List<String> group = groups.get(content);
            if (group.size() >= 2) {
                results.add(group.toArray(new String[0]));
            }
        }
        return results.toArray(new String[0][]);
    }
}
