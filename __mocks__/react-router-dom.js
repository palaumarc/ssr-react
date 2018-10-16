import React from 'react';

export const Switch = ({children}) => <switch-mock>{children}</switch-mock>;
export const Route = ({children, ...props}) => <route-mock {...props}>{children}</route-mock>;
export const Link = ({children, ...props}) => <link-mock {...props}>{children}</link-mock>;