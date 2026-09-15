import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

class Solution {

    public int ladderLength(String beginWord, String endWord, String[] wordList) {
        Set<String> words = new HashSet<>(Arrays.asList(wordList));
        // No sequence can end outside the dictionary.
        if (!words.contains(endWord)) {
            return 0;
        }
        int length = beginWord.length();
        // Bucket every word under each wildcard pattern ("hot" -> "*ot",
        // "h*t", "ho*"): all one-letter neighbors share one of its patterns.
        Map<String, List<String>> buckets = new HashMap<>();
        for (String word : wordList) {
            for (int i = 0; i < length; ++i) {
                buckets.computeIfAbsent(pattern(word, i), key -> new ArrayList<>()).add(word);
            }
        }

        // Level-order BFS; steps starts at 1 because beginWord itself counts.
        Set<String> visited = new HashSet<>();
        visited.add(beginWord);
        List<String> queue = Arrays.asList(beginWord);
        int steps = 1;
        while (!queue.isEmpty()) {
            List<String> next = new ArrayList<>();
            for (String word : queue) {
                if (word.equals(endWord)) {
                    return steps;
                }
                for (int i = 0; i < length; ++i) {
                    // remove() pops the bucket so it is read once overall and
                    // never re-read via a same-level word sharing the pattern.
                    List<String> bucket = buckets.remove(pattern(word, i));
                    if (bucket == null) {
                        continue;
                    }
                    // Each word is enqueued at most once.
                    for (String neighbor : bucket) {
                        if (visited.add(neighbor)) {
                            next.add(neighbor);
                        }
                    }
                }
            }
            queue = next;
            ++steps;
        }
        return 0;
    }

    private static String pattern(String word, int i) {
        return word.substring(0, i) + '*' + word.substring(i + 1);
    }
}
