function isSymbol(c) {
    return (c != +c) && c !== ' ' && !((c || '').toLowerCase() != (c || '').toUpperCase());
}

function getWords(str) {
    let words = [];
    str = str.trim();
    let i = 0;
    let j = 0;
    while (true) {
        while (str[i] === " " || isSymbol(str[i])) {
            i++;
            if (i == str.length) return words;
        } 
        j = i;
        while (str[j+1] !== " " && str[j+1] !== undefined && !isSymbol(str[j + 1])) j++;
        words.push(str.slice(i, j+1));
        i = j + 1;
        if (i == str.length) return words;         
    }
    
}

export function getUpperFirstLetter(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export function getRightSpaces(str) {
    let alphas = str.split("");
    let index = alphas.indexOf(" ");
    let j = 0;
    while (~index) {
        if ((alphas[index + 1] == " ") || isSymbol(alphas[index + 1])) {
            alphas[index] = null;
        }
        index++; 
        
        index = alphas.indexOf(" ", index);
    }

    while (~alphas.indexOf(null)) {
        alphas.splice(alphas.indexOf(null), 1);
    }

    index = -1;
    while (++index < alphas.length) {
        if (isSymbol(alphas[index]) && alphas[index + 1] !== " ") {
            alphas.splice(index + 1, 0, " ");
        }
    }

    return alphas.join('');
}


export function getWordsCount(str) {
    str = getRightSpaces(str);
    return getWords(str).length;
}

export function getUniqueWordsCount(str) {
    let wordsCount = new Map();
    let words = getWords(str).map((word) => word.toLowerCase());
    
    for (let word of words) {
        wordsCount.set(word, wordsCount.has(word)?wordsCount.get(word) + 1:1);
    }

    let answer = [];
    for (let k of wordsCount.keys()) {
        answer.push([k, wordsCount.get(k)]);
    }
    answer.sort((a, b) => a[1] > b[1] ? 1 : -1).reverse();
    return answer;
}

