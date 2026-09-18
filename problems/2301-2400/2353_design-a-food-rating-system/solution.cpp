#include <queue>
#include <string>
#include <unordered_map>
#include <utility>
#include <vector>

class FoodRatings {
  public:
    FoodRatings(vector<string> players, vector<string> teams, vector<int> scores) {
        for (int index = 0; index < (int)players.size(); index++) {
            const string &player = players[index];
            const string &team = teams[index];
            int rating = scores[index];
            info[player] = {team, rating};
            // The min of (-rating, name) is exactly the required winner:
            // highest rating first, ties to the smaller name.
            byTeam[team].push({-rating, player});
        }
    }

    void changeRating(string player, int score) {
        // Lazy deletion: push a fresh entry and leave the outdated one in the
        // heap as garbage; only the info map holds the current rating.
        pair<string, int> &record = info[player];
        record.second = score;
        byTeam[record.first].push({-score, player});
    }

    string highestRated(string team) {
        auto &heap = byTeam[team];
        while (!heap.empty()) {
            auto [negRating, player] = heap.top();
            // An entry is stale when its rating disagrees with the player's
            // current rating; a valid top is peeked, never consumed.
            if (info[player].second == -negRating) {
                return player;
            }
            heap.pop();
        }
        return "";
    }

  private:
    unordered_map<string, pair<string, int>> info;
    unordered_map<string, priority_queue<pair<int, string>, vector<pair<int, string>>, greater<>>> byTeam;
};
