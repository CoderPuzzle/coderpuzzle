// Problem-provided oracle (HtmlParser), C++ side. Compiled into the
// judge's wrapper alongside every submission; never editable in the
// editor. Constructed from the case state: the url library and the edge
// list as generic OjValues, then the query budget.
#pragma once

class HtmlParser {
public:
    HtmlParser(const OjValue& urls, const OjValue& edges, long long budget) : budget_(budget) {
        if (urls.kind != OjValue::Array) throw std::runtime_error("HtmlParser urls must be an array");
        for (const OjValue& url : urls.items) {
            if (url.kind != OjValue::String) throw std::runtime_error("HtmlParser urls must be strings");
            names_.push_back(url.text);
        }
        links_.assign(names_.size(), {});
        index_.reserve(names_.size() * 2);
        for (int i = 0; i < (int)names_.size(); ++i) index_[names_[i]] = i;
        if (edges.kind != OjValue::Array) throw std::runtime_error("HtmlParser edges must be an array");
        for (const OjValue& edge : edges.items) {
            if (edge.kind != OjValue::Array || edge.items.size() != 2 ||
                edge.items[0].kind != OjValue::Int || edge.items[1].kind != OjValue::Int) {
                throw std::runtime_error("HtmlParser edges must be pairs of integers");
            }
            links_[edge.items[0].integer].push_back(names_[edge.items[1].integer]);
        }
    }

    std::vector<std::string> getUrls(const std::string& url) {
        if (budget_ <= 0) throw std::runtime_error("HtmlParser query budget exhausted");
        budget_ -= 1;
        fetched_.insert(url);
        auto found = index_.find(url);
        if (found == index_.end()) return {};
        return links_[found->second];
    }

    // The crawl's observable effect: every page the crawler fetched.
    OjValue verdict() const {
        OjValue out;
        out.kind = OjValue::Array;
        for (const std::string& url : fetched_) {
            OjValue item;
            item.kind = OjValue::String;
            item.text = url;
            out.items.push_back(item);
        }
        return out;
    }

private:
    std::set<std::string> fetched_;
    std::vector<std::string> names_;
    std::vector<std::vector<std::string>> links_;
    std::unordered_map<std::string, int> index_;
    long long budget_;
};
