#include <cctype>
#include <string>

// A lazy single-segment cursor over the compressed string: the iterator
// never expands anything, it holds the current segment's letter, how many
// copies of it are still unspent, and a parse position. next() spends one
// copy and re-parses the next letter-and-count only when the current one
// runs out; counts are read as long long since a single segment may
// repeat a letter 10^9 times.
class StringIterator {
  public:
    StringIterator(std::string compressedString) : s(std::move(compressedString)) {}

    std::string next() {
        if (count == 0) {
            advance();
        }
        if (count == 0) {
            // The parse position reached the end: exhausted for good.
            return " ";
        }
        --count;
        return std::string(1, ch);
    }

    bool hasNext() {
        // More to give whenever the current count is positive or an
        // unparsed segment remains (every segment's count is at least 1).
        return count > 0 || i < s.size();
    }

  private:
    // Load the next segment: one letter, then its run of digits.
    void advance() {
        if (i < s.size()) {
            ch = s[i++];
            long long parsed = 0;
            while (i < s.size() && std::isdigit(static_cast<unsigned char>(s[i]))) {
                parsed = parsed * 10 + (s[i] - '0');
                ++i;
            }
            count = parsed;
        }
    }

    std::string s;
    std::size_t i = 0;
    char ch = ' ';
    long long count = 0;
};
