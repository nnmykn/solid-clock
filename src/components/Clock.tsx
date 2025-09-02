import { styled } from 'solid-styled-components'
import { createSignal, onMount, onCleanup, Component, Show } from 'solid-js'

interface ClockContainerProps {
  transparent?: boolean
}

interface BackgroundImageProps {
  imageUrl?: string
  loaded: boolean
}

interface ClockDisplayProps {
  color: string
  borderColor: string
}

const Container = styled.div<ClockContainerProps>`
  display: block;
  width: 100vw;
  height: 100vh;
  position: relative;
  background: ${p => p.transparent ? 'transparent' : '#2b2b2b'};
  transition: background 0.3s ease;
`

const BackgroundImage = styled.div<BackgroundImageProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${p => p.imageUrl ? `url(${p.imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: ${p => p.loaded ? 1 : 0};
  transition: opacity 0.5s ease-in-out;
  z-index: 1;
`

const ClockDisplay = styled.div<ClockDisplayProps>`
  display: inline-block;
  height: 11.8vw;
  line-height: 10.5vw;
  border: 1vw solid ${p => p.borderColor};
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  padding: 0 2vw;
  text-align: center;
  font-size: 9vw;
  color: ${p => p.color};
  transform: translate(-50%, -50%);
  font-weight: 900;
  vertical-align: 50%;
  cursor: default;
  font-family: 'Noto Sans JP', sans-serif;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.2);
`

interface ClockProps {
  bg?: string
  color?: string
  borderColor?: string
  transparent?: boolean
}

export const Clock: Component<ClockProps> = (props) => {
  const [time, setTime] = createSignal('')
  const [imageLoaded, setImageLoaded] = createSignal(false)
  const [imageUrl, setImageUrl] = createSignal<string>('')
  let timer = 0

  onMount(() => {
    // 時計を即座に開始
    timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('ja-JP', { hour12: false }))
    }, 100)

    // 背景画像の処理
    if (!props.transparent && props.bg) {
      const bgValue = props.bg
      
      // URL形式の背景画像の場合
      if (bgValue.startsWith('url(')) {
        const url = bgValue.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '')
        
        // 画像をプリロード
        const img = new Image()
        img.onload = () => {
          setImageUrl(url)
          setImageLoaded(true)
        }
        img.onerror = () => {
          console.error('Failed to load background image:', url)
          // エラー時はフォールバック背景色のまま
        }
        img.src = url
      } else {
        // 色指定の場合は即座に適用
        setImageUrl('')
        setImageLoaded(true)
      }
    }
  })
  
  onCleanup(() => clearInterval(timer))

  return (
    <Container transparent={props.transparent}>
      <Show when={!props.transparent && imageUrl()}>
        <BackgroundImage 
          imageUrl={imageUrl()} 
          loaded={imageLoaded()}
        />
      </Show>
      <ClockDisplay 
        color={props.color || 'white'} 
        borderColor={props.borderColor || 'white'}
      >
        {time()}
      </ClockDisplay>
    </Container>
  )
}