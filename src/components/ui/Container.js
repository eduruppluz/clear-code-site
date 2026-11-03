import { jsx as _jsx } from "react/jsx-runtime";
export function Container({ as: Tag = 'div', className = '', children }) {
    return _jsx(Tag, { className: `mx-auto w-full max-w-[var(--container)] px-[var(--gutter)] ${className}`, children: children });
}
