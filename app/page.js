"use client";
import { useState } from "react";
import Form from "./components/form";
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css'
import Settings from "./components/settings";
import About from "./components/about";

export default function Home() {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [settingsBottomSheetOpen, setSettingsBottomSheetOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [aboutBottomSheetOpen, setAboutBottomSheetOpen] = useState(false);

  function openAbout() {
    if (window.innerWidth < 800) {
      return setAboutBottomSheetOpen(true);
    } else {
      setAboutModalOpen(true);
    }
  }

  function openSettings() {
    if (window.innerWidth < 800) {
      return setSettingsBottomSheetOpen(true);
    } else {
      setSettingsModalOpen(true);
    }
  }


  return (
    <main>
      <Form />

      <div style={{ position: 'fixed', bottom: '40px', left: 0, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div className="container" style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button className="filed" onClick={() => openAbout()}><span className="emoji">📘</span>&nbsp;정보</button>
          <button className="filed" onClick={() => openSettings()}><span className="emoji">⚙️</span>&nbsp;설정</button>
        </div>
      </div>

      {settingsModalOpen &&
        <div className="modal">
          <div className="modal-box">
            <h2>설정</h2>
            <Settings />
            <button className="primary" style={{ position: 'relative', bottom: 0, float: 'right' }} onClick={() => setSettingsModalOpen(false)}>완료</button>
          </div>
        </div>
      }

      {aboutModalOpen &&
        <div className="modal">
          <div className="modal-box">
            <h2>정보</h2>
            <About />
            <button className="primary" style={{ position: 'relative', bottom: 0, float: 'right' }} onClick={() => setAboutModalOpen(false)}>닫기</button>
          </div>
        </div>
      }

      <BottomSheet open={settingsBottomSheetOpen} expandOnContentDrag={false} scrollLocking={true} onDismiss={() => setSettingsBottomSheetOpen(false)}>
        <div className="bottom-sheet">
          <h2>설정</h2>
          <Settings />
          <button className="modal-btn" onClick={() => setSettingsBottomSheetOpen(false)}>완료</button>
        </div>
      </BottomSheet>

      <BottomSheet open={aboutBottomSheetOpen} expandOnContentDrag={false} scrollLocking={true} onDismiss={() => setAboutBottomSheetOpen(false)}>
        <div className="bottom-sheet">
          <h2>정보</h2>
          <About />
          <button className="modal-btn" onClick={() => setAboutBottomSheetOpen(false)}>닫기</button>
        </div>
      </BottomSheet>
    </main>
  );
}
