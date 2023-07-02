
import { extractWavInfo } from './fileAnalysis';


describe('fileAnalysis function correctly parses WAV header', () => {
    test('it should return the correct information', async () => {
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
        const byteArray = [0x52, 0x49, 0x46, 0x46, // 'RIFF' (chunkID)
            0x24, 0x08, 0x00, 0x00, // Chunk size (replace with actual size)
            0x57, 0x41, 0x56, 0x45, // 'WAVE' (format)
            0x66, 0x6d, 0x74, 0x20, // 'fmt ' (subChunkID)
            0x10, 0x00, 0x00, 0x00, // Subchunk size
            0x01, 0x00, // Audio format
            0x02, 0x00, // Number of channels
            0x22, 0x56, 0x00, 0x00, // Sample rate
            0x88, 0x58, 0x01, 0x00, // Byte rate
            0x04, 0x00, // Block align
            0x10, 0x00, // Bits per sample
            0x64, 0x61, 0x74, 0x61, // 'data' (subChunkID)
            0x00, 0x08, 0x00, 0x00, // Subchunk size (replace with actual size)
            0x00, 0x00, 0x00, 0x00, // Waveform data (replace with actual data)
            0x24, 0x17, 0x1e, 0xf3,
            0x3c, 0x13, 0x3c, 0x14,
            0x16, 0xf9, 0x18, 0xf9,
            0x34, 0xe7, 0x23, 0xa6,
            0x3c, 0xf2, 0x24, 0xf2,
            0x11, 0xce, 0x1a, 0x0d,]
        const mockResult = new Uint8Array(byteArray).buffer;

        const result = await extractWavInfo(mockReader);

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
        const mp4ByteArray = [
            0x00, 0x00, 0x00, 0x18, // Box size
            0x66, 0x74, 0x79, 0x70, // 'ftyp' box type
            0x69, 0x73, 0x6F, 0x6D, // Major brand
            0x00, 0x00, 0x00, 0x01, // Minor version
            0x6D, 0x70, 0x34, 0x31, // Compatible brands (e.g., 'mp41')
            0x00, 0x00, 0x00, 0x14, // Box size
            0x6D, 0x6F, 0x6F, 0x76, // 'moov' box type
            // ... Continue adding byte values for the rest of the MP4 file
        ];

        const mockResult = new Uint8Array(mp4ByteArray).buffer;

        try {
            const result = await extractWavInfo(mockReader); //this will throw an error
        }catch(error){
            expect(error.message).toEqual('Not WAV file format'); //checks to see if correct error
        }
    })
});
