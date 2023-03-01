function strStarts(str, s) {
    return !!~(str.slice(0, s.length)).indexOf(s);
}

function strEnds(str, s) {
    return !!~(str.slice(-s.length)).indexOf(s);
}

function strContains(str, s) {
    return !!~str.indexOf(s);
}

function isCorrectStr(sit, str, s) {
    if (sit == "contains") {
        return strContains(str, s);
    } else if (sit == "starts") {
        return strStarts(str, s);
    } else if (sit == "ends") {
        return strEnds(str, s);
    }
}

function isCorrectInt(source, compr) {
    let sit = compr[1] == "=" ? compr.slice(0, 2) : compr[0];
    if (sit == "<") {
        return +source < +compr.slice(1);
    } else if (sit == ">") {
        return +source > +compr.slice(1);
    } else if (sit == "=") {
        return +source == +compr.slice(1);
    } if (sit == "<=") {
        return +source <= +compr.slice(2);
    } else if (sit == ">=") {
        return +source >= +compr.slice(2);
    } 
}

function compareItem(request, element) {
    request = request.split("-");
    let item = element[request[0]];
    if (request.length == 2) {
        return isCorrectInt(item, request[1]);
    } else if (request.length == 3) {
        return isCorrectStr(request[1], item, request[2]);
    }
}

function compareElement(requests, element) {
    let answer = true;
    let requestList = requests.split("&");
    for (let request of requestList) {
        answer = answer && compareItem(request, element);
    }
    return answer;
}

export function getCorrectList(requests, elements) {
    let newList = [];
    for (let element of elements) {
        if (compareElement(requests, element)) newList.push(element);
    }
    return newList;
}

