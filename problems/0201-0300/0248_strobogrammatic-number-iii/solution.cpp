class Solution {
  public:
    int strobogrammaticInRange(string low, string high) {
        int count = countAtLeast(low);
        // Every length above len(low) contributes in full, len(high)
        // included; the lengths strictly between never touch a boundary.
        for (int length = low.size() + 1; length <= (int)high.size(); ++length) {
            count += totalOfLength(length);
        }
        // Subtracting countAtLeast(high) also drops high itself, so put it
        // back when high is strobogrammatic.
        return count - countAtLeast(high) + isStrobogrammatic(high);
    }

  private:
    // Digits a string of the given length may place at half-position
    // `position`: the outermost digit cannot be 0 (no leading zeros except
    // "0" itself), and an odd length's exact middle must self-rotate,
    // which rules out 6 and 9 there.
    static string choicesAt(int position, int length, int half) {
        if (position == 0 && length > 1)
            return "1689";
        if (length % 2 == 1 && position == half - 1)
            return "018";
        return "01689";
    }

    // Closed form: the first half decides the whole string, so each free
    // half-position multiplies the count.
    static int totalOfLength(int length) {
        int half = (length + 1) / 2;
        int total = 1;
        for (int position = half - 1; position >= 0; --position) {
            total *= choicesAt(position, length, half).size();
        }
        return total;
    }

    // Strobogrammatic strings of the boundary's own length that are >=
    // boundary. A candidate first differs from the boundary at one
    // half-position: a larger digit there settles the comparison, and the
    // inner positions complete freely, in ways[position + 1] ways.
    // Equal-length digit strings compare numerically (neither side has a
    // leading zero), so lexicographic order is numeric order.
    static int countAtLeast(const string &boundary) {
        int length = boundary.size();
        int half = (length + 1) / 2;
        vector<int> ways(half + 1, 1);
        for (int position = half - 1; position >= 0; --position) {
            ways[position] = choicesAt(position, length, half).size() * ways[position + 1];
        }
        int count = 0;
        for (int position = 0; position < half; ++position) {
            string options = choicesAt(position, length, half);
            char digit = boundary[position];
            for (char option : options) {
                if (option > digit)
                    count += ways[position + 1];
            }
            if (options.find(digit) == string::npos)
                return count;
        }
        // Every half-position matched, so the only surviving candidate is
        // the mirror completion of the boundary's own first half.
        string candidate = boundary.substr(0, half);
        for (int i = length - half - 1; i >= 0; --i) {
            candidate += rotate(boundary[i]);
        }
        return count + (candidate >= boundary);
    }

    static bool isStrobogrammatic(const string &value) {
        for (int i = 0; i < (int)value.size(); ++i) {
            if (rotate(value[i]) != value[value.size() - 1 - i])
                return false;
        }
        return true;
    }

    static char rotate(char digit) {
        if (digit == '6')
            return '9';
        if (digit == '9')
            return '6';
        // 0, 1 and 8 rotate to themselves; anything else is not a
        // strobogrammatic digit and fails any equality test.
        return (digit == '0' || digit == '1' || digit == '8') ? digit : '?';
    }
};
