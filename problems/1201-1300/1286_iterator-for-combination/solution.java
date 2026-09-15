import java.util.ArrayList;
import java.util.List;

class CombinationIterator {

    private final List<String> combinations = new ArrayList<>();
    private int position = 0;

    public CombinationIterator(String characters, int combinationLength) {
        // Precompute all combinations via bitmask enumeration. With n <= 15
        // there are at most 2^15 masks; a mask is kept when its popcount
        // equals the combination length. Ascending mask order groups the
        // strings by their highest chosen index rather than by first letter,
        // so an explicit sort restores the lexicographic sequence.
        int n = characters.length();
        for (int mask = 0; mask < 1 << n; mask++) {
            if (Integer.bitCount(mask) != combinationLength) {
                continue;
            }
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < n; i++) {
                if (((mask >> i) & 1) == 1) {
                    sb.append(characters.charAt(i));
                }
            }
            combinations.add(sb.toString());
        }
        combinations.sort(null);
    }

    public String next() {
        return combinations.get(position++);
    }

    public boolean hasNext() {
        return position < combinations.size();
    }
}
