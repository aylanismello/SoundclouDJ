import React from 'react'
import Provider from 'react-redux'
import Home from './components/home'
import {render} from 'react-dom'

const Root = () => (
  <Provider store={store}>
    <Home />
  </Provider>
)

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root')
  render(<Root />, root)
})
