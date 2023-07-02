import { extractWavInfo } from './fileAnalysis';
import { mockByteArrayWAV, mp4ByteArray } from '../mockData/mockBinaryData'

describe('fileAnalysis function correctly parses WAV header', () => {
    test('it should return the correct information', async () => {

        //Simulates a mock FileReader with inital result,onload and onerror properties set to null
        //When this mock FileReader is passed as an argument into the extractWavInfo function, its onload property is assigmed to the onload function in extractWavInfo.
        //Its readAsArrayBuffer is called, which sets the object's result peorpty to mockResult, and calls the onload function
        const mockReader = {
            result: null,
            onload: null,
            onerror: null,
            readAsArrayBuffer: function (file) {
                // Simulate the reading process
                this.result = mockResult
                if (this.onload) {
                    this.onload();
                }
            },
        };

        // Converts the mockByteArrayWAV to an ArrayBuffer representation, with the buffer property equal to the mockResult
        const mockResult = new Uint8Array(mockByteArrayWAV).buffer;

        //Calling the extractWavInfo function with the simlauted mockReader as the only argument
        const result = await extractWavInfo(mockReader);

        // Expeted values are found in mockBinaryData.js
        expect(result).toEqual({
            sampleRate: 22050,
            channels: 2,
            chunkSize: 2084,
            audioFormat: 1,
            byteRate: 88200,
            blockAlign: 4,
            bitsPerSample: 16,
            subChunkID: 0x666d7420,
            chunkID: 0x52494646,
            format: 0x57415645,
        });

        jest.restoreAllMocks();
    });

    test('it should return an error if input file is not in .WAV format. ', async () => {

        //Simulates a mock FileReader with inital result,onload and onerror properties set to null
        //When this mock FileReader is passed as an argument into the extractWavInfo function, its onload property is assigmed to the onload function in extractWavInfo.
        //Its readAsArrayBuffer is called, which sets the object's result peorpty to mockResult, and calls the onload function
        const mockReader = {
            result: null,
            onload: null,
            onerror: null,
            readAsArrayBuffer: function (file) {
                // Simulate the reading process
                this.result = mockResult
                if (this.onload) {
                    this.onload();
                }
            },
        };
        // Converts the mockByteArrayWAV to an ArrayBuffer representation, with the buffer property equal to the mockResult
        const mockResult = new Uint8Array(mp4ByteArray).buffer;

        // A try-catch is used here to determine if the thrown error is the one expected
        try {
            const result = await extractWavInfo(mockReader); //this will throw an error
        } catch (error) {
            expect(error.message).toEqual('Not WAV file format'); //checks to see if correct error
        }
    })
});
