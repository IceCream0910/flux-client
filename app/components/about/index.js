
import { useState } from "react";
import AboutPage from "./about";
import UpdatePage from "./update";
import FaqPage from "./faq";

export default function About() {
    const [activeTab, setActiveTab] = useState('about');
    return (
        <div style={{ margin: '20px 0' }}>
            <div class="options">
                <button onClick={() => setActiveTab('about')} class={activeTab === 'about' ? 'option active' : 'option'}><span className="emoji">📘</span>&nbsp;소개</button>
                <button onClick={() => setActiveTab('update')} class={activeTab === 'update' ? 'option active' : 'option'}><span className="emoji">🔔</span>&nbsp;업데이트</button>
                <button onClick={() => setActiveTab('faq')} class={activeTab === 'faq' ? 'option active' : 'option'}><span className="emoji">❓</span>&nbsp;FAQ</button>
            </div>
            <br />

            <div className="modal-content">
                {activeTab === 'about' && <AboutPage />}
                {activeTab === 'update' && <UpdatePage />}
                {activeTab === 'faq' && <FaqPage />}
            </div>
        </div>
    );
}