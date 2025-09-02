import { Title } from "solid-start";
import { AppLayout } from '~/layouts/app-layout'
import { Clock } from '~/components/Clock'

export default function Home() {
  return (
    <AppLayout>
      <Title>Solid Clock</Title>
      <Clock transparent={true} color="black" borderColor="black" />
    </AppLayout>
  );
}
