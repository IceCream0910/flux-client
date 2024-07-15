import { useState, useEffect } from 'react';

export default function OtherSettings() {
    // 초기 상태를 localStorage에서 불러오거나 기본값 설정
    const [settings, setSettings] = useState(() => {
        const savedSettings = localStorage.getItem('settings');
        return savedSettings ? JSON.parse(savedSettings) : { vQuality: 'max', vCodec: 'h264', twitterGif: false, tiktokH265: false, isAudioOnly: false, aFormat: 'best', isAudioMuted: false, dubLang: false, isTTFullAudio: false, filenamePattern: 'pretty', disableMetadata: false };
    });

    // settings 상태가 변경될 때마다 localStorage에 저장
    useEffect(() => {
        localStorage.setItem('settings', JSON.stringify(settings));
    }, [settings]);


    const changePattern = (pattern) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            filenamePattern: pattern,
        }));
    };



    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3>파일 이름</h3>
            <div className="options">
                {['classic', 'basic', 'pretty', 'nerdy'].map((pattern) => (
                    <button
                        key={pattern}
                        className={`option ${settings.filenamePattern === pattern ? 'active' : ''}`}
                        onClick={() => changePattern(pattern)}
                    >
                        {pattern}
                    </button>
                ))}
            </div>
            <p style={{ opacity: .5 }}>classic: 플랫폼_콘텐츠id_해상도_코덱.mp4<br />
                basic: 제목 (화질, 코덱).mp4<br />
                pretty: 제목 (화질, 코덱, youtube).mp4<br />
                nerdy: 제목 (화질, 코덱, 플랫폼, 콘텐츠id).mp4</p>
            <br />

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                    id='disableMetadata'
                    type="checkbox"
                    checked={settings.disableMetadata}
                    onChange={(e) => setSettings((prevSettings) => ({
                        ...prevSettings,
                        disableMetadata: e.target.checked,
                    }))}
                />
                <label for="disableMetadata">metadata 포함 안 함</label>
            </div>
        </div>
    );
}