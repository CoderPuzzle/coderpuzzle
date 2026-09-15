class Solution {

    public int minimumLength(String s) {
        // Each operation deletes two copies of one letter — the closest
        // same-letter occurrences on either side of a pivot — so every
        // letter's count keeps its parity while pairs keep coming off.
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); ++i) {
            counts[s.charAt(i) - 'a']++;
        }
        // A letter with three or more copies always has a usable pivot,
        // so it reduces to one copy when odd and two when even; letters
        // below three are already stuck there.
        int total = 0;
        for (int count : counts) {
            if (count == 0) {
                continue;
            }
            total += count % 2 == 1 ? 1 : 2;
        }
        return total;
    }
}
