import { Link } from '@solidjs/router'
import { Component, JSX, onMount, Show } from 'solid-js'
import { css, styled, useTheme } from 'solid-styled-components'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: white;
`

export const AppLayout: Component<{ children: JSX.Element }> = (props) => {
  return (
      <Container>
        {props.children}
      </Container>
  )
}
