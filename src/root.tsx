import { Suspense } from 'solid-js'
import {
  ErrorBoundary,
  Body,
  FileRoutes,
  Html,
  Head,
  Routes,
  Scripts,
  Meta,
  Link,
  Title,
} from 'solid-start'

import './style/global.css'

export default function Root() {
  return (
    <Html lang="en" prefix="og: http://ogp.me/ns#">
      <Head>
        <Title>Solid Clock</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Link rel="icon" href="/favicon.ico" />
        <Link rel="preconnect" href="https://fonts.googleapis.com" />
        <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <Link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      <Meta property="og:url" content="https://solid-clock.pages.dev/"/>
      <Meta property="og:title" content="Solid Clock"/>
      <Meta property="og:description" content="Simple Realtime Clock with SolidJS"/>
      <Meta property="og:type" content="website"/>
      <Meta property="og:image" content="https://solid-clock.pages.dev/ogp.png"/>
      </Head>
      <Body>
        <ErrorBoundary>
          <Suspense>
                <Routes>
                  <FileRoutes />
                </Routes>
          </Suspense>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  );
}
