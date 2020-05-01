module.exports = {
    purge: {
        content: [
            './resources/**/*.vue',
            './resources/**/*.blade.php'
        ],
        options: {
            whitelistPatterns: [
                /mode-dark/,
                /w-[0-9]+\/[0-9]+/,     // All variations of width classes we dynamically use in the view-builder
                /bg-[a-z]+-[0-9]+/,     // Dynamically used colors in badges, buttons and so on
                /text-[a-z]+-[0-9]+/,   // ^
                /border-[a-z]+-[0-9]+/, // ^
            ]
        }
    },
    // Disabling *-Opacity plugins reduces final css size by ~750kb. This only works in Tailwind > 1.4.3
    corePlugins: {
        textOpacity: false,
        backgroundOpacity: false,
        borderOpacity: false,
        placeholderOpacity: false,
        divideOpacity: false,
    },
    prefix: '',
    important: false,
    separator: ':',
    theme: {
        extend: {
            colors: {
                gray: {
                    50: '#FBFDFE',
                    100: '#F7FAFC',
                    150: '#F2F6FA',
                    200: '#EDF2F7',
                    250: '#E8EDF4',
                    300: '#E2E8F0',
                    400: '#CBD5E0',
                    500: '#A0AEC0',
                    600: '#718096',
                    650: '#5E6B7F',
                    700: '#4A5568',
                    750: '#3C4658',
                    800: '#2D3748',
                    850: '#242C3A',
                    900: '#1A202C',
                    950: '#0D1016',
                }
            },
            spacing: {
                '0.5': '0.125rem',
                '1.5': '0.375rem',
                '2.5': '0.625rem',
                '3.5': '0.875rem',
                '72': '18rem',
                '80': '20rem',
            },
            maxHeight: {
                '0': '0',
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                'full': '100%',
                '64': '8rem',
                '128': '16rem',
                '256': '24rem',
            },
            minHeight: {
                '1': '0.25rem',
                '2': '0.5rem',
                '4': '1rem',
                '8': '2rem',
                '16': '4rem',
                '32': '6rem',
                '64': '8rem',
            },
            width: {
                '72': '18rem',
                '80': '20rem',
                '88': '22rem',
            }
        },
    },
    variants: {
        alignContent: ['responsive'],
        alignItems: ['responsive'],
        alignSelf: ['responsive'],
        appearance: ['responsive'],
        backgroundAttachment: ['responsive'],
        backgroundColor: ['dark', 'dark-hover', 'dark-group-hover', 'responsive', 'hover', 'focus'],
        backgroundPosition: ['responsive'],
        backgroundRepeat: ['responsive'],
        backgroundSize: ['responsive'],
        borderCollapse: ['responsive'],
        borderColor: ['dark', 'dark-focus', 'dark-focus-within', 'responsive', 'hover', 'focus'],
        borderRadius: ['responsive'],
        borderStyle: ['responsive'],
        borderWidth: ['responsive'],
        boxShadow: ['responsive', 'hover', 'focus'],
        cursor: ['responsive'],
        display: ['responsive'],
        fill: ['responsive'],
        flex: ['responsive'],
        flexDirection: ['responsive'],
        flexGrow: ['responsive'],
        flexShrink: ['responsive'],
        flexWrap: ['responsive'],
        float: ['responsive', 'direction'],
        fontFamily: ['responsive'],
        fontSize: ['responsive'],
        fontSmoothing: ['responsive'],
        fontStyle: ['responsive'],
        fontWeight: ['responsive', 'hover', 'focus'],
        height: ['responsive'],
        inset: ['responsive'],
        justifyContent: ['responsive'],
        letterSpacing: ['responsive'],
        lineHeight: ['responsive'],
        listStylePosition: ['responsive'],
        listStyleType: ['responsive'],
        margin: ['responsive', 'direction'],
        maxHeight: ['responsive'],
        maxWidth: ['responsive'],
        minHeight: ['responsive'],
        minWidth: ['responsive'],
        objectFit: ['responsive'],
        objectPosition: ['responsive'],
        opacity: ['responsive'],
        order: ['responsive'],
        outline: ['responsive', 'focus'],
        overflow: ['responsive'],
        padding: ['responsive', 'direction'],
        pointerEvents: ['responsive'],
        position: ['responsive'],
        resize: ['responsive'],
        stroke: ['responsive'],
        tableLayout: ['responsive'],
        textAlign: ['responsive', 'direction'],
        textColor: ['dark', 'dark-hover', 'dark-active', 'dark-placeholder', 'responsive', 'hover', 'focus'],
        textDecoration: ['responsive', 'hover', 'focus'],
        textTransform: ['responsive'],
        userSelect: ['responsive'],
        verticalAlign: ['responsive'],
        visibility: ['responsive'],
        whitespace: ['responsive'],
        width: ['responsive'],
        wordBreak: ['responsive'],
        zIndex: ['responsive'],
    },
    plugins: [
        require('tailwindcss-dark-mode')(),
        require('tailwindcss-dir')(),
    ],
}