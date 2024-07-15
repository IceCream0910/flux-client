import AudioSettings from "./audio";
import OtherSettings from "./other";
import VideoSettings from "./video";
import { useState } from "react";

export default function Settings() {
    const [activeTab, setActiveTab] = useState('video');
    return (
        <div style={{ margin: '20px 0' }}>
            <div class="options">
                <button onClick={() => setActiveTab('video')} class={activeTab === 'video' ? 'option active' : 'option'}><span className="emoji">📺</span>&nbsp;영상</button>
                <button onClick={() => setActiveTab('audio')} class={activeTab === 'audio' ? 'option active' : 'option'}><span className="emoji">🎧</span>&nbsp;오디오</button>
                <button onClick={() => setActiveTab('other')} class={activeTab === 'other' ? 'option active' : 'option'}><span className="emoji">🔮</span>&nbsp;기타</button>
            </div>
            <br />

            <div className="modal-content">
                {activeTab === 'video' && <VideoSettings />}
                {activeTab === 'audio' && <AudioSettings />}
                {activeTab === 'other' && <OtherSettings />}
            </div>
        </div>
    );
}