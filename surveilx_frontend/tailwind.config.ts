import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				surveil: {
					blue: {
						100: '#E3EFFF',
						200: '#B0D0FF',
						300: '#7EB1FF',
						400: '#5B94F2',
						500: '#3B78DE',
						600: '#1E5ECA',
						700: '#0E46AB',
					},
					green: {
						100: '#E7F9ED',
						200: '#BFEACC',
						300: '#8BD9A8',
						400: '#60C288',
						500: '#3FAB6E',
						600: '#2A9157',
						700: '#17723F',
					},
					emergency: '#EF4444',
					warning: '#F97316',
					info: '#3B82F6',
					success: '#10B981',
					dark: {
						100: '#4B5563',
						200: '#374151',
						300: '#1F2937',
						400: '#111827',
						500: '#0A0F1A',
						600: '#06080F',
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-ring': {
					'0%': {
						transform: 'scale(0.8)',
						opacity: '0',
					},
					'50%': {
						opacity: '0.5',
					},
					'100%': {
						transform: 'scale(1.3)',
						opacity: '0',
					},
				},
				'blink': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.4' },
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				'zoom-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-ring': 'pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
				'blink': 'blink 2s ease-in-out infinite',
				'slide-in-right': 'slide-in-right 0.5s forwards',
				'zoom-in': 'zoom-in 0.3s ease-out',
			},
			boxShadow: {
				'neumorph': '5px 5px 10px rgba(0, 0, 0, 0.3), -5px -5px 10px rgba(255, 255, 255, 0.05)',
				'neumorph-inset': 'inset 5px 5px 10px rgba(0, 0, 0, 0.3), inset -5px -5px 10px rgba(255, 255, 255, 0.05)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
