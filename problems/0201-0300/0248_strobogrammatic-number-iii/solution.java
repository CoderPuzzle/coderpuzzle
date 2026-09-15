class Solution {

    public int strobogrammaticInRange(String low, String high) {
        int count = countAtLeast(low);
        // Every length above len(low) contributes in full, len(high)
        // included; the lengths strictly between never touch a boundary.
        for (int length = low.length() + 1; length <= high.length(); ++length) {
            count += totalOfLength(length);
        }
        // Subtracting countAtLeast(high) also drops high itself, so put it
        // back when high is strobogrammatic.
        return count - countAtLeast(high) + (isStrobogrammatic(high) ? 1 : 0);
    }

    // Digits a string of the given length may place at half-position
    // `position`: the outermost digit cannot be 0 (no leading zeros except
    // "0" itself), and an odd length's exact middle must self-rotate,
    // which rules out 6 and 9 there.
    private static String choicesAt(int position, int length, int half) {
        if (position == 0 && length > 1) return "1689";
        if (length % 2 == 1 && position == half - 1) return "018";
        return "01689";
    }

    // Closed form: the first half decides the whole string, so each free
    // half-position multiplies the count.
    private static int totalOfLength(int length) {
        int half = (length + 1) / 2;
        int total = 1;
        for (int position = half - 1; position >= 0; --position) {
            total *= choicesAt(position, length, half).length();
        }
        return total;
    }

    // Strobogrammatic strings of the boundary's own length that are >=
    // boundary. A candidate first differs from the boundary at one
    // half-position: a larger digit there settles the comparison, and the
    // inner positions complete freely, in ways[position + 1] ways.
    // Equal-length digit strings compare numerically (neither side has a
    // leading zero), so lexicographic order is numeric order.
    private static int countAtLeast(String boundary) {
        int length = boundary.length();
        int half = (length + 1) / 2;
        int[] ways = new int[half + 1];
        ways[half] = 1;
        for (int position = half - 1; position >= 0; --position) {
            ways[position] = choicesAt(position, length, half).length() * ways[position + 1];
        }
        int count = 0;
        for (int position = 0; position < half; ++position) {
            String options = choicesAt(position, length, half);
            char digit = boundary.charAt(position);
            for (int i = 0; i < options.length(); ++i) {
                if (options.charAt(i) > digit) count += ways[position + 1];
            }
            if (options.indexOf(digit) < 0) return count;
        }
        // Every half-position matched, so the only surviving candidate is
        // the mirror completion of the boundary's own first half.
        StringBuilder candidate = new StringBuilder(boundary.substring(0, half));
        for (int i = length - half - 1; i >= 0; --i) {
            candidate.append(rotate(boundary.charAt(i)));
        }
        return count + (candidate.toString().compareTo(boundary) >= 0 ? 1 : 0);
    }

    private static boolean isStrobogrammatic(String value) {
        for (int i = 0; i < value.length(); ++i) {
            if (rotate(value.charAt(i)) != value.charAt(value.length() - 1 - i)) return false;
        }
        return true;
    }

    private static char rotate(char digit) {
        if (digit == '6') return '9';
        if (digit == '9') return '6';
        // 0, 1 and 8 rotate to themselves; anything else is not a
        // strobogrammatic digit and fails any equality test.
        return digit == '0' || digit == '1' || digit == '8' ? digit : '?';
    }
}
