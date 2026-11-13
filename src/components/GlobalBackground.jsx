import globalBg from '../assets/global.bg.jpeg'

const GlobalBackground = () => {
  return (
    <div
      data-global-bg="true"
      aria-hidden="true"
      role="presentation"
      className="pointer-events-none fixed inset-0 z-[30] overflow-hidden select-none"
    >
      <img
        src={globalBg}
        alt=""
        className="h-full w-full object-cover object-center lg:object-[center_20%] grayscale contrast-[1.12] opacity-[0.05] sm:opacity-[0.06] mix-blend-multiply dark:mix-blend-screen dark:opacity-[0.035] sm:dark:opacity-[0.045] dark:contrast-[1.15] dark:brightness-[0.75] transition-opacity duration-300"
        style={{
          maskImage: 'radial-gradient(ellipse at 50% 45%, black 45%, rgba(0,0,0,0.5) 75%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 45%, black 45%, rgba(0,0,0,0.5) 75%, transparent 100%)',
        }}
      />
    </div>
  )
}

export default GlobalBackground
