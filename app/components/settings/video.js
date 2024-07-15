import { useState, useEffect } from 'react';

export default function VideoSettings() {
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
    const changeQuality = (quality) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            vQuality: quality,
        }));
    };

    // 코덱 설정 변경 함수
    const changeCodec = (codec) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            vCodec: codec,
        }));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3>화질</h3>
            <div className="options">
                {['max', '2160p', '1440p', '1080p', '720p', '480p', '360p', '240p', '144p'].map((quality) => (
                    <button
                        key={quality}
                        className={`option ${settings.vQuality === quality ? 'active' : ''}`}
                        onClick={() => changeQuality(quality)}
                    >
                        {quality}
                    </button>
                ))}
            </div>
            <p style={{ opacity: .5 }}>선택한 화질을 다운로드할 수 없는 경우, 가장 가까운 화질로 다운로드됩니다.</p>
            <br />
            <h3>Youtube 코덱</h3>
            <div className="options">
                {['h264', 'av1', 'vp9'].map((codec) => (
                    <button
                        key={codec}
                        className={`option ${settings.vCodec === codec.split(' ')[0] ? 'active' : ''}`}
                        onClick={() => changeCodec(codec.split(' ')[0])}
                    >
                        {codec}
                    </button>
                ))}
            </div>
            <p style={{ opacity: .5 }}>
                h264: 가장 많은 기기와 플랫폼에서 호환됩니다. 최대 1080p 화질까지 지원합니다.<br />
                av1: 가장 뛰어난 품질과 압축률을 자랑합니다. 8k HDR 화질까지 지원합니다.<br />
                vp9: av1과 품질은 동일하나 파일 크기는 약 2배 더 큽니다. 4k HDR 화질까지 지원합니다.<br /><br />
                호환성을 위해서는 h264를, 4k 이상 화질을 원한다면 av1 코덱을 권장합니다.
            </p>
            <br />
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                    id='twitterGif'
                    type="checkbox"
                    checked={settings.twitterGif}
                    onChange={(e) => setSettings((prevSettings) => ({
                        ...prevSettings,
                        twitterGif: e.target.checked,
                    }))}
                />
                <label for="twitterGif">x에서 gifs를 .gif로 변환</label>
            </div>
            <p style={{ opacity: .5, marginBottom: '15px' }}>x(구 twitter)에서 .gifs 파일을 .gif로 변환합니다. 화질이 저하되고 파일 크기가 크게 증가합니다.</p>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                    id='tiktokH265'
                    type="checkbox"
                    checked={settings.tiktokH265}
                    onChange={(e) => setSettings((prevSettings) => ({
                        ...prevSettings,
                        tiktokH265: e.target.checked,
                    }))}
                />
                <label for="tiktokH265">tiktok에서 h265 형식 사용</label>
            </div>
            <p style={{ opacity: .5, marginBottom: '15px' }}>가능한 경우, tiktok에서 h265/hevc 형식을 사용하여 1080p 영상을 다운로드합니다.</p>
        </div>
    );
}