// Tema cálido estilo Apple Health — claro + oscuro
const THEME = {
  light: {
    name: 'light',
    bg: '#F6F1EA',           // cream warm
    surface: '#FFFFFF',
    surfaceAlt: '#FBF6EF',
    surfaceSunken: '#EFE8DD',
    text: '#1F1B16',
    textMuted: '#6E6359',
    textSubtle: '#9A9087',
    border: 'rgba(31,27,22,0.08)',
    borderStrong: 'rgba(31,27,22,0.14)',
    accent: '#E26A4A',       // warm coral (Apple Health orange-ish)
    accentSoft: 'rgba(226,106,74,0.12)',
    success: '#3DA37A',
    chartGrid: 'rgba(31,27,22,0.06)',
    shadow: '0 1px 2px rgba(31,27,22,0.04), 0 4px 16px rgba(31,27,22,0.05)',
    shadowSm: '0 1px 2px rgba(31,27,22,0.05)',
    scrim: 'rgba(31,27,22,0.45)',
    statusDark: false,
  },
  dark: {
    name: 'dark',
    bg: '#15110D',
    surface: '#1F1A14',
    surfaceAlt: '#241E17',
    surfaceSunken: '#100D09',
    text: '#F4EDE2',
    textMuted: '#A89D8E',
    textSubtle: '#75695B',
    border: 'rgba(244,237,226,0.07)',
    borderStrong: 'rgba(244,237,226,0.14)',
    accent: '#F08566',
    accentSoft: 'rgba(240,133,102,0.15)',
    success: '#4FBE93',
    chartGrid: 'rgba(244,237,226,0.06)',
    shadow: '0 2px 6px rgba(0,0,0,0.4), 0 8px 28px rgba(0,0,0,0.32)',
    shadowSm: '0 1px 2px rgba(0,0,0,0.4)',
    scrim: 'rgba(0,0,0,0.55)',
    statusDark: true,
  },
};

const ThemeContext = React.createContext(THEME.light);
const useTheme = () => React.useContext(ThemeContext);

window.THEME = THEME;
window.ThemeContext = ThemeContext;
window.useTheme = useTheme;
