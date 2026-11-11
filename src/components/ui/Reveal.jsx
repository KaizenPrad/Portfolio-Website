import { m, useReducedMotion } from 'framer-motion'

/**
 * Scroll-triggered reveal. Respects prefers-reduced-m.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 26,
  once = true,
  className = '',
  as = 'div',
}) {
  const reduce = useReducedMotion()
  const Component = m[as] ?? m.div

  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.18, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  )
}


