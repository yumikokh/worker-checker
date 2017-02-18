module.exports = function(entry) {
    const entryLength = entry.length;
    let outputData = [];
    for(let i =0; i < entryLength; i++) {
        let categorizedString = entry[i].content.$t.split(', ');
        let column = {};
        for(let j = 0; j < categorizedString.length; j++) {
            let keys = categorizedString[j].split(': ');
            column[keys[0]] = keys[1];
        }
        // A1のセルだけは取得できないので手動対応
        column['id'] = parseInt(entry[i].title.$t, 10);
        outputData.push(column);
    }
    return outputData;
};