/**
 * @param {string[]} words
 * @return {number}
 */
var countPrefixSuffixPairs = function (words) {
    const isPrefixAndSuffix = (str1, str2) => {
        if (str1.length > str2.length) {
            return false;
        }
        const size1 = str1.length;
        const size2 = str2.length;
        for (let index = 0; index < size1; index++) {
            if (str1[index] !== str2[index]) {
                return false;
            }
            if (str1[index] !== str2[size2 - size1 + index]) {
                return false;
            }
        }
        return true;
    };

    let total = 0;
    for (let i = 0; i < words.length; i++) {
        for (let j = i + 1; j < words.length; j++) {
            if (isPrefixAndSuffix(words[i], words[j])) {
                total++;
            }
        }
    }
    return total;
};
