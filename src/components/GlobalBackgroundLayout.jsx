import { Outlet } from 'react-router-dom'
import GlobalBackground from './GlobalBackground'

/**
 * GlobalBackgroundLayout
 * 
 * Shared layout component providing the global photographic background
 * overlay to all nested routes automatically.
 */
const GlobalBackgroundLayout = () => {
  return (
    <>
      <GlobalBackground />
      <Outlet />
    </>
  )
}

export default GlobalBackgroundLayout
