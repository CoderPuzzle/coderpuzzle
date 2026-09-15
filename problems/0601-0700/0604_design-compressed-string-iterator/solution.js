// A lazy single-segment cursor over the compressed string: the iterator
// never expands anything, it holds the current segment's letter, how many
// copies of it are still unspent, and a parse position. next() spends one
// copy and re-parses the next letter-and-count only when the current one
// runs out; counts are read as Numbers since a single segment may repeat
// a letter 10^9 times.
class StringIterator {
    constructor(compressedString) {
        this.s = compressedString;
        this.i = 0;
        this.ch = " ";
        this.count = 0;
    }

    // Load the next segment: one letter, then its run of digits.
    advance() {
        if (this.i < this.s.length) {
            this.ch = this.s[this.i];
            this.i++;
            let parsed = 0;
            while (this.i < this.s.length && this.s[this.i] >= "0" && this.s[this.i] <= "9") {
                parsed = parsed * 10 + (this.s.charCodeAt(this.i) - 48);
                this.i++;
            }
            this.count = parsed;
        }
    }

    next() {
        if (this.count === 0) {
            this.advance();
        }
        if (this.count === 0) {
            // The parse position reached the end: exhausted for good.
            return " ";
        }
        this.count--;
        return this.ch;
    }

    hasNext() {
        // More to give whenever the current count is positive or an
        // unparsed segment remains (every segment's count is at least 1).
        return this.count > 0 || this.i < this.s.length;
    }
}
