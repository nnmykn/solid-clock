import { Title } from "solid-start";
import { styled } from 'solid-styled-components'
import { AppLayout } from '~/layouts/app-layout'
import { createSignal, createEffect } from 'solid-js'

const Container = styled.div`
  display: block;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
`

const Clock = styled.div`
  display: inline-block;
  height: 11.8vw;
  line-height: 10.5vw;
  border: 1vw solid white;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  padding: 0 2vw;
  text-align: center;
  font-size: 9vw;
  color: white;
  transform: translate(-50%, -50%);
  font-weight: 900;
  vertical-align: 50%;
  cursor: default;
  font-family: 'Noto Sans JP', sans-serif;
`

export default function Home() {
  const [time, setTime] = createSignal('')
  createEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 100)
    return () => clearInterval(timer)
  })
  return (
    <AppLayout>
      <Title>Solid Clock</Title>
      <Container>
        <Clock>{time}</Clock>
      </Container>
    </AppLayout>
  );
}
