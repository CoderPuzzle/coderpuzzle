import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    private static int letterBits(char ch) {
        // Two bits per letter: A=0, C=1, G=2, T=3.
        switch (ch) {
            case 'C':
                return 1;
            case 'G':
                return 2;
            case 'T':
                return 3;
            default:
                return 0;
        }
    }

    public String[] findRepeatedDnaSequences(String s) {
        Set<Integer> seen = new HashSet<>();
        // A second set collects each repeated window exactly once, even when
        // it occurs three or more times.
        Set<Integer> repeated = new HashSet<>();
        // 20-bit register: ten letters times two bits each. The oldest
        // letter slides out as the new one slides in.
        int code = 0;
        for (int i = 0; i < s.length(); i++) {
            code = ((code << 2) | letterBits(s.charAt(i))) & 0xFFFFF;
            // Fewer than ten letters seen: no full window yet.
            if (i >= 9) {
                // add() returns false when the window was already seen, i.e.
                // it occurs at least twice.
                if (!seen.add(code)) {
                    repeated.add(code);
                }
            }
        }
        // Decode the surviving codes back into letters.
        List<String> result = new ArrayList<>(repeated.size());
        for (int value : repeated) {
            char[] letters = new char[10];
            int bits = value;
            for (int k = 9; k >= 0; k--) {
                letters[k] = "ACGT".charAt(bits & 3);
                bits >>= 2;
            }
            result.add(new String(letters));
        }
        // Sorted output for a deterministic order.
        String[] array = result.toArray(new String[0]);
        Arrays.sort(array);
        return array;
    }
}
