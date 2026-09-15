function fizzBuzz(n: number): string[] {
    const answer: string[] = [];
    for (let i = 1; i <= n; ++i) {
        // Each divisor appends its own word, so "FizzBuzz" emerges from
        // both checks passing and an empty build falls back to the
        // number itself — no branch ever enumerates all four cases.
        let entry = "";
        if (i % 3 === 0) {
            entry += "Fizz";
        }
        if (i % 5 === 0) {
            entry += "Buzz";
        }
        if (entry === "") {
            answer.push(String(i));
        } else {
            answer.push(entry);
        }
    }
    return answer;
}
