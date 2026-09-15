class Solution {
  public:
    string numberToWords(int num) {
        const char *ones[] = {
            "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
        };
        const char *teens[] = {
            "Ten",     "Eleven",  "Twelve",    "Thirteen", "Fourteen",
            "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen",
        };
        const char *tens[] = {
            "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety",
        };
        vector<string> pieces;
        // One group below 1000: the hundreds digit's word plus "Hundred",
        // then the remainder under 100 — taken wholesale through the teens,
        // tens word plus ones digit otherwise.
        auto spellGroup = [&](int value) {
            if (value >= 100) {
                pieces.push_back(ones[value / 100]);
                pieces.push_back("Hundred");
                value %= 100;
            }
            if (value >= 20) {
                pieces.push_back(tens[value / 10]);
                value %= 10;
            } else if (value >= 10) {
                pieces.push_back(teens[value - 10]);
                value = 0;
            }
            if (value > 0)
                pieces.push_back(ones[value]);
        };
        // Walk the scales high to low: each non-empty group spells itself and
        // appends its scale word, so an all-zero middle group (1000010's
        // thousands) contributes nothing at all.
        const int scaleValues[] = {1000000000, 1000000, 1000};
        const char *scaleNames[] = {"Billion", "Million", "Thousand"};
        for (int i = 0; i < 3; ++i) {
            if (num >= scaleValues[i]) {
                spellGroup(num / scaleValues[i]);
                pieces.push_back(scaleNames[i]);
                num %= scaleValues[i];
            }
        }
        if (num > 0)
            spellGroup(num);
        string joined;
        for (size_t i = 0; i < pieces.size(); ++i) {
            if (i > 0)
                joined += " ";
            joined += pieces[i];
        }
        // Zero is the only input that leaves no piece — it spells itself.
        return joined.empty() ? "Zero" : joined;
    }
};
