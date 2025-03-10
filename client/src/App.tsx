import { Suspense } from 'react'
import './App.css'
import { useRoutes } from 'react-router'
import routes from '~react-pages'

function App() {

  return (
    <Suspense fallback={<p>Loading....</p>}>
      {useRoutes(routes)}
    </Suspense>
  )
}

export default App
