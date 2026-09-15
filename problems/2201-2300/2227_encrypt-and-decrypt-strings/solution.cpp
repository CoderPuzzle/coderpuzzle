#include <string>
#include <unordered_map>
#include <vector>

// Forward map for encryption; for decryption, dictionary words are
// pre-encrypted once and counted in a bag, so each decrypt call is one
// hash lookup — the count of dictionary strings whose encryption equals
// word2 equals the number of ways word2 decrypts into the dictionary.
class Encrypter {
  public:
    Encrypter(vector<string> &keys, vector<string> &values, vector<string> &dictionary) {
        for (size_t i = 0; i < keys.size(); i++) {
            forward[keys[i][0]] = values[i];
        }
        for (const string &word : dictionary) {
            string encrypted = encrypt(word);
            if (!encrypted.empty()) {
                enc_counts[encrypted]++;
            }
        }
    }

    string encrypt(string word1) {
        string out;
        out.reserve(word1.size() * 2);
        for (char ch : word1) {
            auto it = forward.find(ch);
            if (it == forward.end()) {
                return "";
            }
            out += it->second;
        }
        return out;
    }

    int decrypt(string word2) {
        auto it = enc_counts.find(word2);
        return it == enc_counts.end() ? 0 : it->second;
    }

  private:
    unordered_map<char, string> forward;
    unordered_map<string, int> enc_counts;
};
