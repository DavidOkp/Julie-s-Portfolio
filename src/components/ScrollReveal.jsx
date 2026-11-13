import { useEffect, useRef, useState } from 'react'

const ScrollReveal = ({
  as = 'div',
  children,
  className = '',
  delay = 0,
  ...props
}) => {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(() => (
    typeof window === 'undefined'
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    || !('IntersectionObserver' in window)
  ))

  useEffect(() => {
    const element = elementRef.current
    if (!element || isVisible) return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setIsVisible(true)
      observer.unobserve(entry.target)
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -48px 0px',
    })

    observer.observe(element)
    return () => observer.disconnect()
  }, [isVisible])

  const Element = as
  return (
    <Element
      ref={elementRef}
      {...props}
      className={`scroll-reveal${isVisible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </Element>
  )
}

export default ScrollReveal