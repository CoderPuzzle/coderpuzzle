// Problem-provided oracle (Master), C++ side. Compiled into the
// judge's wrapper alongside every submission; never editable in the
// editor. Constructed from the case state: the wordlist and the secret
// word as generic OjValues, then the guess budget.
#pragma once

class Master {
public:
    Master(const OjValue& wordlist, const OjValue& secret, long long budget) : budget_(budget) {
        if (wordlist.kind != OjValue::Array) throw std::runtime_error("Master wordlist must be an array");
        for (const OjValue& item : wordlist.items) {
            if (item.kind != OjValue::String) throw std::runtime_error("Master wordlist entries must be strings");
        }
        if (secret.kind != OjValue::String) throw std::runtime_error("Master secret must be a string");
        secret_ = secret.text;
    }

    int guess(const std::string& word) {
        if (budget_ <= 0) throw std::runtime_error("Master guess budget exhausted");
        budget_ -= 1;
        if (word == secret_) found_ = true;
        int matches = 0;
        int n = static_cast<int>(std::min(word.size(), secret_.size()));
        for (int i = 0; i < n; ++i) {
            if (word[i] == secret_[i]) matches += 1;
        }
        return matches;
    }

    OjValue verdict() const {
        OjValue out;
        out.kind = OjValue::Bool;
        out.boolean = found_;
        return out;
    }

private:
    std::string secret_;
    bool found_ = false;
    long long budget_;
};
