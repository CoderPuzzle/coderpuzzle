class HtmlParser;

class Solution {
  public:
    void crawl(HtmlParser &htmlParser, string startUrl) {
        string home = hostname(startUrl);
        unordered_set<string> seen{startUrl};
        queue<string> queue_;
        queue_.push(startUrl);
        while (!queue_.empty()) {
            string url = queue_.front();
            queue_.pop();
            for (const string &link : htmlParser.getUrls(url)) {
                // Foreign hostnames are neither returned nor expanded;
                // marking at enqueue time keeps getUrls to one call per page.
                if (hostname(link) == home && seen.insert(link).second) {
                    queue_.push(link);
                }
            }
        }
        // The judged artifact is the oracle's record of every page fetched.
    }

  private:
    string hostname(const string &url) {
        // Everything between "http://" and the next "/".
        size_t start = url.find('/') + 2; // past "http://"
        size_t slash = url.find('/', start);
        return slash == string::npos ? url.substr(start) : url.substr(start, slash - start);
    }
};
