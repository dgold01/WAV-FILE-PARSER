// Mock binary data for a correct WAV file with the known information :
// 52 49 46 46 - Chunk ID = "RIFF"
// 24 08 00 00 - Chunk Size = 2084
// 57 41 56 45 - Format = "WAVE"
// 66 6D 74 20 - Sub Chunk ID = "fmt "
// 01 00 - Audio Format = 1(PCM)
// 02 00 - Number of Channels = 2
// 22 56 00 00 - Sample Rate = 22050
// 88 58 01 00 - Byte Rate = 88200
// 04 00 - Block Align = 4
// 10 00 - Bits Per Sample = 16 bits
const mockByteArrayWAV = [0x52, 0x49, 0x46, 0x46,
    0x24, 0x08, 0x00, 0x00,
    0x57, 0x41, 0x56, 0x45,
    0x66, 0x6d, 0x74, 0x20,
    0x10, 0x00, 0x00, 0x00,
    0x01, 0x00,
    0x02, 0x00,
    0x22, 0x56, 0x00, 0x00,
    0x88, 0x58, 0x01, 0x00,
    0x04, 0x00,
    0x10, 0x00,
    0x64, 0x61, 0x74, 0x61,
    0x00, 0x08, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
    0x24, 0x17, 0x1e, 0xf3,
    0x3c, 0x13, 0x3c, 0x14,
    0x16, 0xf9, 0x18, 0xf9,
    0x34, 0xe7, 0x23, 0xa6,
    0x3c, 0xf2, 0x24, 0xf2,
    0x11, 0xce, 0x1a, 0x0d,]


//Mock binary data for a MP4 file
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


module.exports = {
    mockByteArrayWAV,
    mp4ByteArray,
  };