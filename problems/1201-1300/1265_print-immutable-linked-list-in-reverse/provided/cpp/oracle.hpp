// Problem-provided oracle (ImmutableListNode), C++ side. Compiled into
// the judge's wrapper alongside every submission; never editable in the
// editor. Constructed from the case state: the serialized linked list
// as one generic OjValue, then the query budget. The chain is wired at
// construction and this object IS the head handed to the solution.
#pragma once

class ImmutableListNode {
public:
    ImmutableListNode(const OjValue& head, long long budget)
        : value_(0), next_(nullptr), owner_(nullptr),
          transcript_(std::make_shared<std::vector<long long>>()),
          budget_(budget) {
        if (head.kind != OjValue::String) {
            throw std::runtime_error("ImmutableListNode head must be a string");
        }
        std::vector<long long> values;
        const std::string& text = head.text;
        size_t start = 0;
        while (start < text.size()) {
            size_t comma = text.find(',', start);
            if (comma == std::string::npos) comma = text.size();
            values.push_back(std::stoll(text.substr(start, comma - start)));
            start = comma + 1;
        }
        // Wire the chain from the tail inward; this node stays the head.
        ImmutableListNode* tail = nullptr;
        for (size_t i = values.size(); i-- > 1;) {
            auto node = new ImmutableListNode(values[i], this, transcript_);
            node->next_ = tail;
            tail = node;
        }
        if (!values.empty()) {
            value_ = values[0];
            next_ = tail;
        } else {
            // Empty list: the solution still receives a node, but it has
            // no successor and prints nothing.
        }
    }

    ~ImmutableListNode() {
        // Only the judge-constructed head frees the chained nodes.
        if (owner_ != nullptr) return;
        ImmutableListNode* cur = next_;
        while (cur != nullptr) {
            ImmutableListNode* nxt = cur->next_;
            delete cur;
            cur = nxt;
        }
    }

    void printValue() {
        if (budget_ <= 0) {
            throw std::runtime_error("ImmutableListNode query budget exhausted");
        }
        budget_ -= 1;
        transcript_->push_back(value_);
    }

    // Returns the next node, or null past the end of the list.
    ImmutableListNode* getNext() { return next_; }

    // The observable effect: the exact sequence of printed values.
    OjValue verdict() const {
        OjValue out;
        out.kind = OjValue::Array;
        for (long long v : *transcript_) {
            OjValue item;
            item.kind = OjValue::Int;
            item.integer = v;
            out.items.push_back(item);
        }
        return out;
    }

private:
    ImmutableListNode(long long value, ImmutableListNode* owner,
                      std::shared_ptr<std::vector<long long>> transcript)
        : value_(value), next_(nullptr), owner_(owner),
          transcript_(std::move(transcript)),
          budget_(std::numeric_limits<long long>::max()) {}

    long long value_;
    ImmutableListNode* next_;
    // Points at the owning head for chain nodes; null on the head itself.
    ImmutableListNode* owner_;
    std::shared_ptr<std::vector<long long>> transcript_;
    long long budget_;
};
