// Problem-provided oracle (the read4 wire). The wrapper constructs the
// oracle from its tagged case values plus the query budget; values[0]
// is the generic case array for content, values[1] the judge's
// out-buffer allocation for the case (unused by the file).
class File {
    // values carries one entry per oracle-construction key: values[0] is
    // the content array itself, values[1] the buffer capacity.
    constructor(values, budget) {
        this.content = values[0].map((item) => String(item));
        this.budget = budget;
        this.position = 0;
    }

    read4(buf4) {
        if (this.budget <= 0) throw new Error("Oracle query budget exhausted");
        this.budget -= 1;
        const count = Math.min(4, this.content.length - this.position);
        for (let index = 0; index < count; index++) {
            buf4[index] = this.content[this.position + index];
        }
        this.position += count;
        return count;
    }
}
