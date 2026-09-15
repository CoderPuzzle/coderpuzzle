class Solution {
  public:
    string discountPrices(string sentence, int discount) {
        // A word is a price exactly when '$' leads a run of digits only.
        // Whole-dollar prices make price * (100 - discount) the discounted value
        // in exact cents, so integer arithmetic renders the two decimals without
        // ever touching binary floats.
        const long long factor = 100 - discount;
        string result;
        size_t start = 0;
        while (start < sentence.size()) {
            size_t end = sentence.find(' ', start);
            if (end == string::npos)
                end = sentence.size();
            const string word = sentence.substr(start, end - start);
            bool price = word.size() > 1 && word[0] == '$';
            for (size_t position = 1; price && position < word.size(); position++)
                if (!isdigit(static_cast<unsigned char>(word[position])))
                    price = false;
            if (price) {
                const long long cents = stoll(word.substr(1)) * factor;
                const long long whole = cents / 100, fraction = cents % 100;
                result += "$" + to_string(whole) + "." + (fraction < 10 ? "0" : "") + to_string(fraction);
            } else {
                result += word;
            }
            start = end + 1;
            if (end < sentence.size())
                result += ' ';
        }
        return result;
    }
};
