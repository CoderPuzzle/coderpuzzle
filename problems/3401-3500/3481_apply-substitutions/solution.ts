// The replacements form a DAG on keys: expand(key) renders its raw value,
// recursing into each %X% reference exactly once via the memo.
function applySubstitutions(replacements: string[][], text: string): string {
    const raw = new Map<string, string>();
    for (const [key, value] of replacements) {
        raw.set(key, value);
    }
    const done = new Map<string, string>();

    function expand(key: string): string {
        if (done.has(key)) {
            return done.get(key)!;
        }
        // %K% placeholders are three characters wide (single-letter
        // keys), so one linear scan splits value into literals and refs.
        const value = raw.get(key)!;
        let out = "";
        let i = 0;
        while (i < value.length) {
            if (value[i] === "%") {
                out += expand(value[i + 1]);
                i += 3;
            } else {
                out += value[i];
                i += 1;
            }
        }
        done.set(key, out);
        return out;
    }

    let out = "";
    let i = 0;
    while (i < text.length) {
        if (text[i] === "%") {
            out += expand(text[i + 1]);
            i += 3;
        } else {
            out += text[i];
            i += 1;
        }
    }
    return out;
}
