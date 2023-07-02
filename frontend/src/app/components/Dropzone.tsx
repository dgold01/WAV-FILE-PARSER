'use client'

import '../components/Dropzone.css'
import { useEffect, useState } from "react";
import { extractWavInfo } from '../utils/fileAnalysis/fileAnalysis'



export default function DropZone() {
    const [inDropZone, setInDropZone] = useState(false);
    const [fileLoading, setFileLoading] = useState(false)
    const [showError, setShowError] = useState(false)
    const [fileList, setFileList] = useState(null);
    const [newSampleRate, setNewSampleRate] = useState(null)
    const [newChannels, setNewChannles] = useState(null)
    const [newByteRate, setNewByteRate] = useState(null)
    const [newChunkSize, setNewChunkSize] = useState(null)
    const [newBitsPerSample, setNewBitsPerSample] = useState(null)
    const [newBlockAlign, setNewBlockAlign] = useState(null)
    const [newAudioFormat, setNewAudioFormat] = useState(null)
    const [newSubChunkIDString, setNewSubChunkIDString] = useState('')
    const [newFormatString, setNewFormatString] = useState('')
    const [newChunkIDString, setNewChunkIDString] = useState('')


    useEffect(() => {

        async function getFileInfo() {
            console.log('test')
            try {
                if (fileList) {
                    setFileLoading(true)
                    await new Promise(res => setTimeout(res, 1000))
                    console.log(fileList)
                    const file = fileList[0]
                    console.log(file)
                    const reader = new FileReader()

                    try {
                        const { sampleRate, channels, byteRate, chunkSize, audioFormat, bitsPerSample, blockAlign, subChunkID, chunkID, format } = await extractWavInfo(reader, file)
                        if (chunkID === 1380533830) {
                            setNewChunkIDString('RIFF')
                        }
                        if (format === 0x57415645) {
                            setNewFormatString('WAVE')
                        }
                        if (subChunkID === 0x666d7420) {
                            setNewSubChunkIDString('FMT')
                        }
                        console.log(chunkID.toString(16))
                        setNewSampleRate(sampleRate)
                        setNewChannles(channels)
                        setNewByteRate(byteRate)
                        setNewBlockAlign(blockAlign)
                        setNewChunkSize(chunkSize)
                        setNewAudioFormat(audioFormat)
                        setNewBitsPerSample(bitsPerSample)
                        setFileLoading(false)
                    }
                    catch (error) {
                        if (error.message === 'Not WAV file format') {
                            setFileLoading(false)
                            setShowError(true)
                            await new Promise(res => setTimeout(res, 2500))
                            setShowError(false)
                        }
                    }
                }

            } catch (e) { console.log(e) }
            console.log('test')
        }
        if (fileList) {
            getFileInfo()
        }
    }, [fileList])




    function handleDragEnter(e: any) {
        e.preventDefault();
        e.stopPropagation()
        setInDropZone(true)
    }
    function handleDragLeave(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setInDropZone(false);
    };

    function handleDragOver(e: any) {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
        setInDropZone(true);
    };

    function handleDrop(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setFileList(e.dataTransfer.files);
        setInDropZone(false);
    }
    return (
        <>
            <div className="container">
                <div className='fileContainer'>
                    <h1 className='header'>WAV FILE EXTRACTOR</h1>
                    <div className={`dropzone ${inDropZone ? 'dropzoneDROPHERE' : 'dropzoneDRAGFILE'}`}
                        onDragEnter={(e) => handleDragEnter(e)}
                        onDragOver={(e) => handleDragOver(e)}
                        onDragLeave={(e) => handleDragLeave(e)}
                        onDrop={(e) => handleDrop(e)}
                    >
                        {showError ? (
                            <h3 className='dropzoneText'>
                                Sorry, the selected file is not in WAV format. Please choose a valid WAV file.
                            </h3>
                        ) : inDropZone ? (
                            <h3 className="dropzoneText">
                                DROP HERE
                            </h3>
                        ) : !fileLoading ? (
                            <h3 className="dropzoneText">
                                DRAG FILE
                            </h3>
                        ) : (
                            <h3 className="dropzoneText">
                                FILE DROPPED
                            </h3>
                        )}
                    </div>
                </div>

                {newSampleRate && (
                    <div className='resultsContainer'>
                        <div className='results'>
                            <h1 className='tableTitle'>RESULTS</h1>
                            <table className='resultsTable'>
                                <thead>
                                    <tr className='header'>
                                        <th>HEADER</th>
                                        <th>VALUE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>CHUNK ID</td>
                                        <td>{newChunkIDString}</td>
                                    </tr>
                                    <tr>
                                        <td>CHUNK SIZE</td>
                                        <td>{newChunkSize}</td>
                                    </tr>
                                    <tr>
                                        <td>FORMAT</td>
                                        <td>{newFormatString}</td>
                                    </tr>
                                    <tr>
                                        <td>SUB CHUNK ID</td>
                                        <td>{newSubChunkIDString}</td>
                                    </tr>
                                    <tr>
                                        <td>AUDIO FORMAT</td>
                                        <td>{newAudioFormat}</td>
                                    </tr>
                                    <tr>
                                        <td>NUM CHANNLES</td>
                                        <td>{newChannels}</td>
                                    </tr>
                                    <tr>
                                        <td>SAMPLE RATE</td>
                                        <td>{newSampleRate}</td>
                                    </tr>
                                    <tr>
                                        <td>BYTE RATE</td>
                                        <td>BYTE {newByteRate}</td>
                                    </tr>

                                    <tr>
                                        <td>BLOCK ALIGN</td>
                                        <td>{newBlockAlign}</td>
                                    </tr>
                                    <tr>
                                        <td>BITS PER SAMPLE</td>
                                        <td>{newBitsPerSample}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </>

    );
};

