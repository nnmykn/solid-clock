import { styled } from 'solid-styled-components'
import { createSignal, onMount, onCleanup, Component } from 'solid-js'

interface ClockContainerProps {
  bg?: string
  transparent?: boolean
}

interface ClockDisplayProps {
  color: string
  borderColor: string
}

const Container = styled.div<ClockContainerProps>`
  display: block;
  width: 100vw;
  height: 100vh;
  background: ${p => p.transparent ? 'transparent' : p.bg || "url('https://picsum.photos/4000')"};
  background-size: cover;
  background-repeat: no-repeat;
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
`

interface ClockProps {
  bg?: string
  color?: string
  borderColor?: string
  transparent?: boolean
}

export const Clock: Component<ClockProps> = (props) => {
  const [time, setTime] = createSignal('')
  let timer = 0

  onMount(() => {
    timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('ja-JP', { hour12: false }))
    }, 100)
  })
  
  onCleanup(() => clearInterval(timer))

  return (
    <Container bg={props.bg} transparent={props.transparent}>
      <ClockDisplay 
        color={props.color || 'white'} 
        borderColor={props.borderColor || 'white'}
      >
        {time()}
      </ClockDisplay>
    </Container>
  )
}