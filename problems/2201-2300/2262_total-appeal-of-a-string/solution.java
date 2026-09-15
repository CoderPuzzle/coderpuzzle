import java.util.Arrays;

class Solution {

    public long appealSum(String s) {
        // flip the accounting: per character, count the substrings containing it
        int[] last = new int[26];
        // -1 = not yet seen, so i - last[c] counts all i + 1 possible starts
        Arrays.fill(last, -1);
        long total = 0;
        // current = total appeal of all substrings ending at i
        long current = 0;
        for (int i = 0; i < s.length(); i++) {
            int c = s.charAt(i) - 'a';
            // s[i] is newly counted in the substrings starting after its previous
            // occurrence
            current += i - last[c];
            last[c] = i;
            // each substring is charged once per distinct char it contains: its appeal
            total += current;
        }
        return total;
    }
}
