const AbajoIcon = ({ size = 32
    , className ="" }) => {

return (

<svg 
xmlns="http://www.w3.org/2000/svg" 
width={size}
height={size} 
viewBox="0 0 24 24" 
fill="none" 
stroke="currentColor" 
strokeWidth="2" 
strokeLinecap="round" 
strokeLinejoin="round" 
className={className}>
    <path d="M19 3H5"/>
    <path d="M12 21V7"/>
    <path d="m6 15 6 6 6-6"/></svg>

            );
};
const ArribaIcon = ({ size = 32
    , className ="" }) => {

return (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}>
            <path d="m18 9-6-6-6 6"/>
            <path d="M12 3v14"/>
            <path d="M5 21h14"/>
    </svg>
        );
};

export { 
    AbajoIcon, 
    ArribaIcon };