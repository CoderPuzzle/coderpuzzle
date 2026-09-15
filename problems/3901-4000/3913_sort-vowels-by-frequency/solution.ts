function sortVowels(s: string): string {
    const vowels = "aeiou";
    const counts = new Array<number>(5).fill(0);
    const first = new Array<number>(5).fill(s.length);
    for (let position = 0; position < s.length; position++) {
        const slot = vowels.indexOf(s[position]);
        if (slot !== -1) {
            counts[slot]++;
            first[slot] = Math.min(first[slot], position);
        }
    }

    const order = [0, 1, 2, 3, 4].sort((a, b) => counts[b] - counts[a] || first[a] - first[b]);
    const arranged = order.map((slot) => vowels[slot].repeat(counts[slot])).join("");
    const answer = s.split("");
    let pointer = 0;
    for (let position = 0; position < answer.length; position++) {
        if (vowels.includes(answer[position])) answer[position] = arranged[pointer++];
    }
    return answer.join("");
}
