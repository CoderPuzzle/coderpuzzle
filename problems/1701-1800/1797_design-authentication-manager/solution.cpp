#include <deque>
#include <string>
#include <unordered_map>
#include <utility>

// A FIFO queue of (tokenId, expiry) events plus a map of each token's
// current expiry. Call times strictly increase and an expiry is always
// currentTime + timeToLive, so every generate — and every fulfilled renew
// — appends the largest expiry seen so far to the tail; expiries grow
// along the queue. countUnexpiredTokens retires the front while it is
// stale (a renew superseded it) or expired, and then the map's size is
// the live count: nothing behind an unexpired front can be expired.
class AuthenticationManager {
  public:
    AuthenticationManager(int timeToLive) : time_to_live_(timeToLive) {}

    void generate(string tokenId, int currentTime) {
        int expiry = currentTime + time_to_live_;
        expiry_by_token_[tokenId] = expiry;
        queue_.push_back(Token{std::move(tokenId), expiry});
    }

    void renew(string tokenId, int currentTime) {
        auto found = expiry_by_token_.find(tokenId);
        if (found == expiry_by_token_.end() || found->second <= currentTime) {
            return;
        }
        found->second = currentTime + time_to_live_;
        queue_.push_back(Token{std::move(tokenId), found->second});
    }

    int countUnexpiredTokens(int currentTime) {
        while (!queue_.empty()) {
            const Token &front = queue_.front();
            auto found = expiry_by_token_.find(front.token_id);
            if (found != expiry_by_token_.end() && found->second == front.expiry) {
                if (front.expiry > currentTime) {
                    break;
                }
                expiry_by_token_.erase(found);
            }
            queue_.pop_front();
        }
        return static_cast<int>(expiry_by_token_.size());
    }

  private:
    struct Token {
        string token_id;
        int expiry;
    };

    int time_to_live_;
    unordered_map<string, int> expiry_by_token_;
    deque<Token> queue_;
};
