class Solution {
  public:
    string convertDateToBinary(string date) {
        // The calendar pads month and day to two digits, but the binary form
        // drops that padding: each dash-separated component is parsed as its
        // plain decimal value and rendered in base 2 with no leading zeroes,
        // then the pieces are rejoined with dashes in year-month-day order.
        // Repeated division collects bits least-significant first, so each
        // fragment is reversed before it is appended.
        string result;
        int start = 0;
        for (int i = 0; i <= (int)date.size(); ++i) {
            if (i < (int)date.size() && date[i] != '-') {
                continue;
            }
            if (!result.empty()) {
                result += '-';
            }
            int value = stoi(date.substr(start, i - start));
            string bits;
            do {
                bits += char('0' + value % 2);
                value /= 2;
            } while (value > 0);
            reverse(bits.begin(), bits.end());
            result += bits;
            start = i + 1;
        }
        return result;
    }
};
