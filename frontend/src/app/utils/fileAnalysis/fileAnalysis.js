// The FileReader is abstracted out of this function to allow for testing. In fileAnalysis.test.js, a mock FileReader is created, 
// since we don't have access to the FileReader when not in browser.

// This function takes a file reader object as the first argument and an optional second argument file object, the second argument is not used in testing.
// The function returns a promise that will resolve with the WAV header info. If no WAV file is deteced, a error is thrown.
module.exports = function extractWavInfo(reader, file) {
    return new Promise((resolve, reject) => {
        // Event handler when the FileReader finishes loading the file
        reader.onload = function () {
            // Obtains the binary data from the FileReader's result
            const buffer = reader.result;

            // Creates a DataView object to interpret the binary data stored in the buffer.
            const view = new DataView(buffer);


            // Checks to see if file is in WAV format. If not, promise is rejected.
            if (view.getUint32(0, true) !== 0x52494646 && view.getUint32(0, false) !== 0x52494646) {
                reject(new Error('Not WAV file format'));
            }

            // Interprets the binary data as an integer and accesses the numerical information encoded within the data.
            // First argument refers to the byte offset in the WAV header.

            // These data chunks are in little-endian form, and so are extracted with the second argument 'true'
            const sampleRate = view.getUint32(24, true);
            const channels = view.getUint16(22, true);
            const chunkSize = view.getUint32(4, true);
            const audioFormat = view.getUint16(20, true);
            const byteRate = view.getUint32(28, true);
            const blockAlign = view.getUint16(32, true);
            const bitsPerSample = view.getUint16(34, true);

            // These data chunks are in big-endian form, and so are extracted with the second argument 'false'
            const subChunkID = view.getUint32(12, false);
            const format = view.getUint32(8, false);
            const chunkID = view.getUint32(0, false);

            resolve({
                sampleRate: sampleRate,
                channels: channels,
                chunkSize: chunkSize,
                audioFormat: audioFormat,
                byteRate: byteRate,
                blockAlign: blockAlign,
                bitsPerSample: bitsPerSample,
                subChunkID: subChunkID,
                chunkID: chunkID,
                format: format
            });
        };

        // Event handler when FileReader encounters an error reading the file
        reader.onerror = function () {
            reject(new Error('Error reading the file'));
        };
        // Read the file as an array buffer using FileReader
        if (file) reader.readAsArrayBuffer(file);
        // If the file argument is not provided, assume that the FileReader itself has a file property
        else { reader.readAsArrayBuffer(reader.file); }
    });
};
