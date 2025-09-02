import { Title } from "solid-start";
import { AppLayout } from '~/layouts/app-layout'
import { onMount } from 'solid-js'
import { createStore } from "solid-js/store";
import { Clock } from '~/components/Clock'

export default function Home() {
  const [option, setOption] = createStore({ bg: '', color: '', borderColor: '' })

  onMount(() => {
    const url = new URL(window.location.href)

    setOption({
      bg: url.searchParams.get('bg') || "url('https://picsum.photos/4000')",
      color: url.searchParams.get('color') || "white",
      borderColor: url.searchParams.get('border-color') || "white"
    })
  })

  return (
    <AppLayout>
      <Title>Solid Clock</Title>
      <Clock bg={option.bg} color={option.color} borderColor={option.borderColor} />
    </AppLayout>
  );
}
