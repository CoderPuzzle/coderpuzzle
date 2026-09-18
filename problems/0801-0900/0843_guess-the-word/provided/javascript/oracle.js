// Problem-provided oracle (Master), JavaScript side. Evaluated
// with every submission by the judge; never editable in the editor.
// Constructed from the case state: the wordlist and the secret word
// (generic values) and the guess budget. Integers may arrive as BigInt
// for exactness.
class Master {
    constructor(construction, budget) {
        this.secret = String(construction[1]);
        this.budget = Number(budget);
        this.calls = 0;
        this.found = false;
    }

    guess(word) {
        if (this.budget <= 0) {
            throw new Error("Master guess budget exhausted");
        }
        this.budget -= 1;
        this.calls += 1;
        if (word === this.secret) {
            this.found = true;
        }
        let matches = 0;
        const n = Math.min(word.length, this.secret.length);
        for (let i = 0; i < n; i++) {
            if (word[i] === this.secret[i]) {
                matches += 1;
            }
        }
        return matches;
    }

    verdict() {
        return this.found;
    }
}
