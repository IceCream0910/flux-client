import React, { useState, useEffect } from 'react';
import IonIcon from '@reacticons/ionicons';
import callAPI from '../utils/call';
import downloadMedia from '../utils/downloadMedia';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css'

export default function Form() {
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [clipboard, setClipboard] = useState('');
    const [errorBottomSheetOpen, setErrorBottomSheetOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [settings, setSettings] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedSettings = localStorage.getItem('settings');
            return savedSettings ? JSON.parse(savedSettings) : { vQuality: 'max', vCodec: 'h264', twitterGif: false, tiktokH265: false, isAudioOnly: false, aFormat: 'best', isAudioMuted: false, dubLang: false, isTTFullAudio: false, filenamePattern: 'pretty', disableMetadata: false };
        }
        return { vQuality: 'max', vCodec: 'h264', twitterGif: false, tiktokH265: false, isAudioOnly: false, aFormat: 'best', isAudioMuted: false, dubLang: false, isTTFullAudio: false, filenamePattern: 'pretty', disableMetadata: false };
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('settings', JSON.stringify(settings));
        }
    }, [settings]);

    useEffect(() => {
        const checkClipboard = async () => {
            if (document.hasFocus()) {
                try {
                    const text = await navigator.clipboard.readText();
                    if (text.startsWith('http://') || text.startsWith('https://')) {
                        setClipboard(text);
                    } else {
                        setClipboard('');
                    }
                } catch (err) {
                    console.error('Failed to read clipboard contents: ', err);
                }
            }
        };

        const intervalId = setInterval(checkClipboard, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        if (event) {
            event.preventDefault();
        }
        if (!inputValue) return;
        if (loading) return;

        const body = {
            url: inputValue,
            ...settings,
        };

        setLoading(true);
        try {
            const response = await callAPI(body);
            const result = await downloadMedia(response);
            if (result.status === 'error') {
                setErrorMsg(result.text);
                setErrorBottomSheetOpen(true);
            }
        } catch (error) {
            console.error('Error during form submission:', error);
            alert('An error occurred during submission. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleFromClipboard = async (url) => {
        if (!url) return;
        if (loading) return;

        const body = {
            url: url,
            ...settings,
        };

        setLoading(true);
        try {
            const response = await callAPI(body);
            const result = await downloadMedia(response);
            if (result.status === 'error') {
                setErrorMsg(result.text);
                setErrorBottomSheetOpen(true);
            }
        } catch (error) {
            console.error('Error during form submission:', error);
            alert('An error occurred during submission. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleModeChange = (mode) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            isAudioOnly: (mode === 'audio'),
        }));
    };

    const handleClipboardDownload = () => {
        setInputValue(clipboard);
        handleFromClipboard(clipboard);
    };

    return (
        <div className='container' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
            <h2>Flux</h2>
            <p style={{ opacity: .7 }}>좋아하는 거, 뭐든지 저장.</p>
            <form onSubmit={handleFormSubmit}>
                <div style={{ display: 'flex', marginTop: '15px' }}>
                    <input type="url" placeholder="URL 입력" value={inputValue} onChange={handleInputChange} />
                    {loading ?
                        <button type="submit" disabled><div className='loader' /></button>
                        :
                        <button type="submit"><IonIcon name="arrow-forward" /></button>
                    }
                </div>
            </form>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <div className="tabs">
                    <input type="radio" id="radio-1" name="tabs" onChange={() => handleModeChange('auto')} />
                    <label className="tab" htmlFor="radio-1"><span className='emoji'>✨</span>&nbsp;자동</label>
                    <input type="radio" id="radio-2" name="tabs" onChange={() => handleModeChange('audio')} />
                    <label className="tab" htmlFor="radio-2"><span className='emoji'>🎧</span>&nbsp;오디오</label>
                    <span className="glider"></span>
                </div>
                {clipboard && <button className='primary' id='clipboard-btn' onClick={handleClipboardDownload}><span className='emoji'>📋</span>&nbsp;복사한 링크</button>}
            </div>

            <BottomSheet open={errorBottomSheetOpen} expandOnContentDrag={false} scrollLocking={true} onDismiss={() => setErrorBottomSheetOpen(false)}>
                <div className="bottom-sheet">
                    <h2><span className='emoji'>⚠️</span>&nbsp;오류</h2>
                    <p style={{ margin: '15px 0' }}>{errorMsg && errorMsg}</p>
                    <button className="modal-btn" onClick={() => setErrorBottomSheetOpen(false)}>완료</button>
                </div>
            </BottomSheet>
        </div>
    );
}