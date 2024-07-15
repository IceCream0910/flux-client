import { useState, useEffect } from 'react';

export default function AudioSettings() {
    // 초기 상태를 localStorage에서 불러오거나 기본값 설정
    const [settings, setSettings] = useState(() => {
        const savedSettings = localStorage.getItem('settings');
        return savedSettings ? JSON.parse(savedSettings) : { vQuality: 'max', vCodec: 'h264', twitterGif: false, tiktokH265: false, isAudioOnly: false, aFormat: 'best', isAudioMuted: false, dubLang: false, isTTFullAudio: false, filenamePattern: 'pretty', disableMetadata: false };
    });

    // settings 상태가 변경될 때마다 localStorage에 저장
    useEffect(() => {
        localStorage.setItem('settings', JSON.stringify(settings));
    }, [settings]);

    // 화질 설정 변경 함수
    const changeFormat = (quality) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            aFormat: quality,
        }));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3>파일 형식</h3>
            <div className="options">
                {['best', 'mp3', 'ogg', 'wav', 'opus'].map((format) => (
                    <button
                        key={format}
                        className={`option ${settings.aFormat === format ? 'active' : ''}`}
                        onClick={() => changeFormat(format)}
                    >
                        {format}
                    </button>
                ))}
            </div>
            <p style={{ opacity: .5 }}>"best" 형식을 선택하면, 서비스에서 제공하는 오디오를 재인코딩 과정 없이 그대로 다운로드 합니다.</p>
            <br />
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                    id='isAudioMuted'
                    type="checkbox"
                    checked={settings.isAudioMuted}
                    onChange={(e) => setSettings((prevSettings) => ({
                        ...prevSettings,
                        isAudioMuted: e.target.checked,
                    }))}
                />
                <label for="isAudioMuted">소리 없이 다운로드</label>
            </div>
            <p style={{ opacity: .5, marginBottom: '15px' }}>가능한 경우, 소리를 음소거 한 상태로 다운로드합니다.</p>


            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                    id='dubLang'
                    type="checkbox"
                    checked={settings.dubLang}
                    onChange={(e) => setSettings((prevSettings) => ({
                        ...prevSettings,
                        dubLang: e.target.checked,
                    }))}
                />
                <label for="dubLang">Youtube 오디오 더빙 활성화</label>
            </div>
            <p style={{ opacity: .5, marginBottom: '15px' }}>YouTube 더빙 오디오 트랙에 사용 중인 브라우저의 기본 언어를 사용합니다.</p>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                    id='isTTFullAudio'
                    type="checkbox"
                    checked={settings.isTTFullAudio}
                    onChange={(e) => setSettings((prevSettings) => ({
                        ...prevSettings,
                        isTTFullAudio: e.target.checked,
                    }))}
                />
                <label for="isTTFullAudio">tiktok 전체 오디오 다운로드</label>
            </div>
            <p style={{ opacity: .5, marginBottom: '15px' }}>tiktok 영상에서 사용된 원본 사운드를 다운로드합니다.</p>
        </div>
    );
}