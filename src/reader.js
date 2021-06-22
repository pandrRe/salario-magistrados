function Reader() {
    function readStringFromChunk(reader, chunk) {
        return reader.decode(chunk, {stream: true});
    }
    
    async function getCSVStreamReader(url) {
        const response = await fetch(url);
        return response.body.getReader();
    }
    
    async function* readCSVStreamToLines(reader) {
        const utf8Reader = new TextDecoder("utf-8");
        let ongoingLine = "";
        let done = false;
    
        const linebreakRegex = /\r\n/gm;
    
        while (!done) {
            let {value, done: streamDone} = await reader.read();
    
            if (streamDone) {
                done = true;
            }
            else {
                let startIndex = 0;
                let stringValue = readStringFromChunk(utf8Reader, value);
                while (true) {
                    let indexHistory = linebreakRegex.lastIndex;
                    let result = linebreakRegex.exec(stringValue);
                    if (result) {
                        yield ongoingLine + stringValue.substr(startIndex, (linebreakRegex.lastIndex - 2) - startIndex);
                        ongoingLine = "";
                        startIndex = linebreakRegex.lastIndex;
                    }
                    else {
                        if (indexHistory !== 0) {
                            ongoingLine = stringValue.substr(indexHistory);
                        }
                        break;
                    }
                }
            }
        }
    }

    return {
        getCSVStreamReader,
        readCSVStreamToLines
    }
}

export { Reader };