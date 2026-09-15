import java.util.HashMap;
import java.util.Map;

class Solution {

    public boolean isStrobogrammatic(String num) {
        // A 180-degree turn reverses digit order and rotates each digit, and
        // only 0, 1, 8 (to themselves) and 6, 9 (to each other) survive it.
        Map<Character, Character> rotated = new HashMap<>();
        rotated.put('0', '0');
        rotated.put('1', '1');
        rotated.put('8', '8');
        rotated.put('6', '9');
        rotated.put('9', '6');
        int left = 0,
            right = num.length() - 1;
        while (left <= right) {
            // Each digit must be the rotation of the digit standing opposite.
            Character turn = rotated.get(num.charAt(left));
            if (turn == null || turn != num.charAt(right)) return false;
            ++left;
            --right;
        }
        return true;
    }
}
