import { Title } from "solid-start";
import { styled } from 'solid-styled-components'
import { AppLayout } from '~/layouts/app-layout'
import { createSignal, onMount, onCleanup } from 'solid-js'
import { createStore } from "solid-js/store";

const Container = styled.div<{ bg: string }>`
  display: block;
  width: 100vw;
  height: 100vh;
  background: ${p => p.bg};
  background-size: cover;
  background-repeat: no-repeat;
`

const Clock = styled.div<{ color: string, borderColor: string }>`
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

export default function Home() {
  const [time, setTime] = createSignal('')
  const [option, setOption] = createStore({ bg: '', color: '', borderColor: '' })

  let timer = 0

  onMount(() => {
    const url = new URL(window.location.href)

    setOption({
      bg: url.searchParams.get('bg') || "url('https://source.unsplash.com/random')",
      color: url.searchParams.get('color') || "white",
      borderColor: url.searchParams.get('border-color') || "white"
    })

    timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 100)
  })
  onCleanup(() => clearInterval(timer))

  return (
    <AppLayout>
      <Title>Solid Clock</Title>
      <Container bg={option.bg}>
        <Clock color={option.color} borderColor={option.borderColor}>{time}</Clock>
      </Container>
    </AppLayout>
  );
}
