#include <string>
#include <vector>

// Counter-indexed tiny URLs: the object keeps every URL it has encoded,
// in order, and answers with "http://tinyurl.com/" plus the URL's 1-based
// position in that list written in lowercase base-36 — "1" for the first,
// "a" for the tenth, "10" for the 36th.
class Codec {
  public:
    string encode(string longUrl) {
        urls.push_back(longUrl);
        const string digits = "0123456789abcdefghijklmnopqrstuvwxyz";
        string suffix;
        // divmod yields the least-significant digit first, so each new
        // digit is prepended — the loop ends with the most significant.
        for (int position = (int)urls.size(); position > 0; position /= 36) {
            suffix.insert(suffix.begin(), digits[position % 36]);
        }
        return "http://tinyurl.com/" + suffix;
    }

    string decode(string shortUrl) {
        const string prefix = "http://tinyurl.com/";
        string suffix = shortUrl.substr(prefix.size());
        int position = 0;
        for (char digit : suffix) {
            int value = digit <= '9' ? digit - '0' : digit - 'a' + 10;
            position = position * 36 + value;
        }
        return urls[position - 1];
    }

  private:
    vector<string> urls;
};
