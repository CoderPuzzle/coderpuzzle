import java.util.Arrays;

class Solution {

    public String sortVowels(String s) {
        String vowels = "aeiou";
        int[] counts = new int[5];
        int[] first = new int[5];
        Arrays.fill(first, s.length());
        for (int position = 0; position < s.length(); position++) {
            int slot = vowels.indexOf(s.charAt(position));
            if (slot != -1) {
                counts[slot]++;
                first[slot] = Math.min(first[slot], position);
            }
        }

        Integer[] order = { 0, 1, 2, 3, 4 };
        Arrays.sort(order, (a, b) -> counts[a] != counts[b] ? counts[b] - counts[a] : first[a] - first[b]);
        StringBuilder arranged = new StringBuilder();
        for (int slot : order) {
            arranged.append(String.valueOf(vowels.charAt(slot)).repeat(counts[slot]));
        }

        char[] answer = s.toCharArray();
        int pointer = 0;
        for (int position = 0; position < answer.length; position++) {
            if (vowels.indexOf(answer[position]) != -1) {
                answer[position] = arranged.charAt(pointer++);
            }
        }
        return new String(answer);
    }
}
