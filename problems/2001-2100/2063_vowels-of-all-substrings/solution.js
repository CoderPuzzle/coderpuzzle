var countVowels = function (word) {
    let total = 0;
    for (let index = 0; index < word.length; index++) {
        if ("aeiou".includes(word[index])) {
            total += (index + 1) * (word.length - index);
        }
    }
    return total;
};
