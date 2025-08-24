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
			padding: {
				DEFAULT: '1rem',
				sm: '1.5rem',
				md: '2rem',
				lg: '2.5rem',
				xl: '3rem',
				'2xl': '4rem'
			},
			screens: {
				'xs': '475px',
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1536px',
				'3xl': '1920px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				
				/* Brutalist Color System */
				'brutalist-black': 'hsl(var(--brutalist-black))',
				'brutalist-white': 'hsl(var(--brutalist-white))',
				'brutalist-yellow': 'hsl(var(--brutalist-yellow))',
				'brutalist-red': 'hsl(var(--brutalist-red))',
				'brutalist-blue': 'hsl(var(--brutalist-blue))',
				'brutalist-gray': 'hsl(var(--brutalist-gray))',
				
				/* Difficulty Colors */
				beginner: 'hsl(var(--beginner))',
				'beginner-foreground': 'hsl(var(--beginner-foreground))',
				intermediate: 'hsl(var(--intermediate))',
				'intermediate-foreground': 'hsl(var(--intermediate-foreground))',
				advanced: 'hsl(var(--advanced))',
				'advanced-foreground': 'hsl(var(--advanced-foreground))',
				
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
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			
			/* Responsive Font Sizes */
			fontSize: {
				'fluid-xs': 'var(--font-size-xs)',
				'fluid-sm': 'var(--font-size-sm)',
				'fluid-base': 'var(--font-size-base)',
				'fluid-lg': 'var(--font-size-lg)',
				'fluid-xl': 'var(--font-size-xl)',
				'fluid-2xl': 'var(--font-size-2xl)',
				'fluid-3xl': 'var(--font-size-3xl)',
				'fluid-4xl': 'var(--font-size-4xl)',
				'fluid-5xl': 'var(--font-size-5xl)',
				'fluid-6xl': 'var(--font-size-6xl)',
				'fluid-7xl': 'var(--font-size-7xl)',
				'fluid-8xl': 'var(--font-size-8xl)',
			},
			
			/* Responsive Spacing */
			spacing: {
				'fluid-xs': 'var(--space-xs)',
				'fluid-sm': 'var(--space-sm)',
				'fluid-md': 'var(--space-md)',
				'fluid-lg': 'var(--space-lg)',
				'fluid-xl': 'var(--space-xl)',
				'fluid-2xl': 'var(--space-2xl)',
				'fluid-3xl': 'var(--space-3xl)',
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
				'brutalist-wiggle': {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				},
				'brutalist-slide': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'brutalist-bounce': {
					'0%, 100%': { transform: 'translateY(0) scale(1)' },
					'50%': { transform: 'translateY(-10px) scale(1.05)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'brutalist-wiggle': 'brutalist-wiggle 1s ease-in-out infinite',
				'brutalist-slide': 'brutalist-slide 0.5s ease-out',
				'brutalist-bounce': 'brutalist-bounce 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
