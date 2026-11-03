import { jsx as _jsx } from "react/jsx-runtime";
import { encodeTheme } from '../config/themes';
export function Themed({ as: Tag = 'section', theme, label, children, ...rest }) {
    return (_jsx(Tag, { "data-theme": encodeTheme(theme), "data-label": label, ...rest, children: children }));
}
