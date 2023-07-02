
//the FileReader is abstaracted out of this function to allow for testting. In fileAnalysis.test.js, a mock FileReader is created, since we don't have access to the FileReader when not in browser.

export function extractWavInfo(reader,file) {
    return new Promise((resolve, reject) => {
      reader.onload = function () {
        const buffer = reader.result;
        const view = new DataView(buffer);
  
        // checks to see if file is in WAV format. If not, promise is rejected
        if (view.getUint32(0, true) !== 0x52494646 && view.getUint32(0, false) !== 0x52494646) {
          reject(new Error('Not WAV file format'));
        }
  
        // Extracts the sample rate and number of channels
        const sampleRate = view.getUint32(24, true);
        const channels = view.getUint16(22, true);
        const chunkSize = view.getUint32(4, true);
        const audioFormat = view.getUint16(20, true);
        const byteRate = view.getUint32(28, true);
        const blockAlign = view.getUint16(32, true);
        const bitsPerSample = view.getUint16(34, true);
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
  
      reader.onerror = function() {
        reject(new Error('Error reading the file'));
      };

      if(file) reader.readAsArrayBuffer(file);
      else{reader.readAsArrayBuffer(reader.file); }
    });
  };
  