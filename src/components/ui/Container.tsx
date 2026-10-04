import type { ElementType, ReactNode } from 'react'

export function Container({ as: Tag = 'div', className = '', children }: { as?: ElementType; className?: string; children: ReactNode }) {
  return <Tag className={`mx-auto w-full max-w-[var(--container)] px-[var(--gutter)] ${className}`}>{children}</Tag>
}
