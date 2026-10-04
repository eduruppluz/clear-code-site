import type { ElementType, HTMLAttributes, ReactNode, Ref } from 'react'
import { encodeTheme, type Theme } from '../config/themes'

/**
 * Marca um bloco com uma cor de tema. O motor de cor usa esses blocos
 * para saber "que cor está a tela" conforme o scroll.
 * `label` + `id` também colocam o bloco no indicador lateral.
 */
type Props = HTMLAttributes<HTMLElement> & {
  as?: ElementType
  theme: Theme
  label?: string
  ref?: Ref<HTMLElement>
  children: ReactNode
}

export function Themed({ as: Tag = 'section', theme, label, children, ...rest }: Props) {
  return (
    <Tag data-theme={encodeTheme(theme)} data-label={label} {...rest}>
      {children}
    </Tag>
  )
}
