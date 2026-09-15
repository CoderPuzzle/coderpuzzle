import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public int[] topStudents(
        String[] positive_feedback,
        String[] negative_feedback,
        String[] report,
        int[] student_id,
        int k
    ) {
        // Membership sets make each report token O(1) to classify: +3 for
        // a positive word, -1 for a negative one, everything else free.
        // Sorting the (-points, id) pairs ascending is exactly the asked
        // ranking — highest points first, lower ID breaking ties — so the
        // first k identifiers are the answer.
        Set<String> positives = new HashSet<>(Arrays.asList(positive_feedback));
        Set<String> negatives = new HashSet<>(Arrays.asList(negative_feedback));
        List<int[]> ranked = new ArrayList<>();
        for (int i = 0; i < report.length; i++) {
            int points = 0;
            for (String word : report[i].split(" ")) {
                if (positives.contains(word)) {
                    points += 3;
                } else if (negatives.contains(word)) {
                    points -= 1;
                }
            }
            ranked.add(new int[] { -points, student_id[i] });
        }
        ranked.sort((a, b) -> a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(a[1], b[1]));
        int[] answer = new int[k];
        for (int i = 0; i < k; i++) {
            answer[i] = ranked.get(i)[1];
        }
        return answer;
    }
}
