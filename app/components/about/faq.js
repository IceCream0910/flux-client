export default function FaqPage() {
    return (
        <div>
            <h3>Q. 다운로드 속도가 느려요</h3>
            <p style={{ opacity: .8 }}>사용자의 지리적 위치, 현재 서버 사용량 등에 따라 다운로드 속도가 저하될 수 있습니다. 안정적인 서비스를 제공하기 위해 지속적으로 서버를 증설하고 있습니다.</p>
            <br />
            <h3>Q. 다운로드 한 영상이 제대로 재생되지 않아요</h3>
            <p style={{ opacity: .8 }}>Flux 설정에서 영상 코덱을 변경해보세요. h264 코덱은 대부분의 환경에서 호환됩니다. 다른 코덱을 사용할 경우 일부 기기나 서비스에서 호환되지 않을 수 있습니다.
                예를 들어, av1 코덱은 Adobe사의 Premier Pro에서 호환되지 않습니다.<br /><br />
                만약, 다운로드 한 영상에서 재생 시간을 조절할 수 없다면, 영상 플레이어의 문제일 수 있습니다. VLC와 같은 최신 플레이어나 대부분의 최신 브라우저 환경에서 정상 재생됩니다.

            </p>
            <br />
        </div>
    )
}