import Webcam from 'react-webcam';
import React, { useEffect, useState } from 'react'
import { createMatcher, getFullFaceDescriptions } from '../../services/faceapi';
import { getSubmissions } from '../../services/jotform';
import { parseSubmissions } from '../../utils/dbform';
import { submissionLabels } from '../../constants/submissionLabels';

const VideoInput = ({ dbFormId, onRecognized, setDescription, setRecognizedUser, recognizedUser }) => {

    const [drawBox, setDrawBox] = useState(null);
    const [dbFaces, setDbFaces] = useState(null);
    const [faceMatcher, setFaceMatcher] = useState();
    const [descriptions, setDescriptions] = useState();
    const [facingMode, setFacingMode] = useState();
    const [webcamRef, setWebcamRef] = useState();
    const [match, setMatch] = useState();
    const [videoConstraints, setVideoConstraints] = useState();
    const [detections, setDetections] = useState();

    const WIDTH = 420;
    const HEIGHT = 420;
    const inputSize = 160;

    useEffect(() => {
        const init = async () => {
            setWebcamRef(React.createRef());
            try {
               if(dbFormId){
                const { data } = await getSubmissions(dbFormId);
                setDbFaces(parseSubmissions(data.content, submissionLabels))
               }
            } catch (error) {
                console.log(error)
            }
        }
        init();
    }, [dbFormId])


    useEffect(() => {
        const init = async () => {
            if (!!dbFaces) {
                setFaceMatcher(createMatcher(dbFaces))
                
            }
            setInputDevice();
        }
        init();

    }, [dbFaces])

    useEffect(() => {
        if (!!facingMode) {
            setVideoConstraints({
                width: WIDTH,
                height: HEIGHT,
                facingMode: facingMode
            })
        }
    }
        , [facingMode])

    useEffect(() => {
        const interval = setInterval(() => {
            const capture = async () => {
                if (!!webcamRef.current) {
                    await getFullFaceDescriptions(
                        webcamRef.current.getScreenshot(),
                        inputSize
                    ).then(fullDesc => {
                        if (!!fullDesc) {
                            setDetections(fullDesc.map(fd => fd.detection))
                            setDescriptions(fullDesc.map(fd => fd.descriptor))
                            if (!!(fullDesc.length)) setDescription(fullDesc.map(fd => Object.values(fd.descriptor)))
                        }
                    }).catch((e) => {
                        console.error(e)
                    })
                };

            }
            capture();
        }, 1500);
        return () => clearInterval(interval);
    }, [setDescription, webcamRef])

    useEffect(() => {
        const init = () => {
            if (!!descriptions && !!(descriptions.length)) {
                if(!!faceMatcher && (!!dbFaces.length)){
                    let temp = descriptions.map(desc => faceMatcher.findBestMatch(desc))
                    if (!!temp[0] && temp[0]._label === 'unknown') {
                        onRecognized(false)
                    } else if (!!temp[0] && temp[0]._label !== 'unknown') {
                        onRecognized(true);
                        setRecognizedUser(dbFaces.filter((face) => face.id === temp[0]._label)[0])
                    }
                    setMatch(temp)
                } else {
                    onRecognized(false)
                }
            }
        }
        init();
    }, [dbFaces, descriptions, faceMatcher, onRecognized, setRecognizedUser])


    useEffect(() => {
        const drawDetection = () => {
            if (!!detections) {
                let temp = detections.map((detection, i) => {
                    let _H = detection.box.height;
                    let _W = detection.box.width;
                    let _X = detection.box._x;
                    let _Y = detection.box._y;
                    return (
                        <div key={i}>
                            <div
                                style={{
                                    position: 'absolute',
                                    border: 'solid',
                                    borderColor: 'blue',
                                    height: _H,
                                    width: _W,
                                    transform: `translate(${_X}px,${_Y}px)`
                                }}
                            >
                               
                                    <p
                                        style={{
                                            backgroundColor: 'blue',
                                            border: 'solid',
                                            borderColor: 'blue',
                                            width: _W,
                                            marginTop: 0,
                                            color: '#fff',
                                            transform: `translate(-3px,${_H}px)`
                                        }}
                                    >
                                        {recognizedUser ? ((!!match && match[0]._label !== 'unknown') ? recognizedUser.name : "Another face was already recognized") : "I couldn't recognize"}
                                    </p>
                             
                            </div>
                        </div>
                    );
                });
                setDrawBox(temp);
            }
        }
        drawDetection();
    }, [detections, match, recognizedUser])


    const setInputDevice = () => {
        navigator.mediaDevices.enumerateDevices().then(async devices => {
            let inputDevice = devices.filter(
                device => device.kind === 'videoinput'
            );
            if (inputDevice.length < 3) {
                setFacingMode('user')

            } else {
                setFacingMode('environment')

            }

        });
    };





    return (
        <div
            className="Camera"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <div
                style={{
                    width: WIDTH,
                    height: HEIGHT
                }}
            >
                <div style={{ position: 'relative', width: WIDTH }} >
                    {!!videoConstraints ? (
                        <div style={{ position: 'absolute' }}>
                            <Webcam
                                audio={false}
                                width={WIDTH}
                                height={HEIGHT}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={videoConstraints}
                            />
                        </div>
                    ) : null}
                    {!!drawBox ? drawBox : null}
                </div>
            </div>
        </div>
    );

}

export default VideoInput;