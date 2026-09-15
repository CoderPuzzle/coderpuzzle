class Solution {
  public:
    int minimumLength(string s) {
        // Each operation deletes two copies of one letter — the closest
        // same-letter occurrences on either side of a pivot — so every
        // letter's count keeps its parity while pairs keep coming off.
        array<int, 26> counts{};
        for (char ch : s) {
            counts[ch - 'a']++;
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
};
