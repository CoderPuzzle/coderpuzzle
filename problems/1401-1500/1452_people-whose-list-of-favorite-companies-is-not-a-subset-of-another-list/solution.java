import java.util.HashSet;
import java.util.Set;

class Solution {

    public int[] peopleIndexes(String[][] favoriteCompanies) {
        Set<String>[] sets = new HashSet[favoriteCompanies.length];
        for (int i = 0; i < favoriteCompanies.length; i++) {
            sets[i] = new HashSet<>();
            for (String company : favoriteCompanies[i]) {
                sets[i].add(company);
            }
        }
        int[] temp = new int[favoriteCompanies.length];
        int count = 0;
        for (int i = 0; i < sets.length; i++) {
            boolean covered = false;
            for (int j = 0; j < sets.length && !covered; j++) {
                if (i == j || sets[j].size() <= sets[i].size()) {
                    continue;
                }
                boolean inside = true;
                for (String company : favoriteCompanies[i]) {
                    if (!sets[j].contains(company)) {
                        inside = false;
                        break;
                    }
                }
                covered = inside;
            }
            if (!covered) {
                temp[count++] = i;
            }
        }
        int[] answer = new int[count];
        for (int i = 0; i < count; i++) {
            answer[i] = temp[i];
        }
        return answer;
    }
}
