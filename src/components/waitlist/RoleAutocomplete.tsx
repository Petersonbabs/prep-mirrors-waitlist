import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { searchJobTitles } from '../../services/waitlistService'
import { Search } from 'lucide-react'

interface RoleAutocompleteProps {
    value: string
    onChange: (value: string) => void
    onSelect: (normalizedValue: string) => void
}

export function RoleAutocomplete({ value, onChange, onSelect }: RoleAutocompleteProps) {
    const [suggestions, setSuggestions] = useState<{ name: string; slug: string }[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (value.length >= 2) {
                setLoading(true)
                try {
                    const results = await searchJobTitles(value)
                    setSuggestions(results)
                    setIsOpen(results.length > 0)
                } catch (err) {
                    console.error(err)
                } finally {
                    setLoading(false)
                }
            } else {
                setSuggestions([])
                setIsOpen(false)
            }
        }, 300)

        return () => clearTimeout(timer)
    }, [value])

    const allSuggestions = value.length >= 2 ? [{ name: value, slug: 'custom' }, ...suggestions] : []

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            setSelectedIndex(prev => (prev < allSuggestions.length - 1 ? prev + 1 : prev))
        } else if (e.key === 'ArrowUp') {
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev))
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            handleSelect(allSuggestions[selectedIndex])
        }
    }

    const handleSelect = (suggestion: { name: string; slug: string }) => {
        onSelect(suggestion.name)
        setIsOpen(false)
        setSelectedIndex(-1)
    }

    return (
        <div className="relative" ref={containerRef}>
            <label htmlFor="role" className="block text-sm font-semibold text-neutral-700 mb-2">
                Target Role
            </label>
            <div className="relative">
                <input
                    id="role"
                    type="text"
                    value={value}
                    onChange={(e) => {
                        onChange(e.target.value)
                        setSelectedIndex(-1) // Reset selection when typing
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => value.length >= 2 && setIsOpen(true)}
                    placeholder="e.g., Software Engineer, Product Manager"
                    className="w-full pl-10 pr-4 py-3 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-50 transition-all text-neutral-900"
                    autoFocus
                    autoComplete="off"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                {loading && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
            </div>

            <AnimatePresence>
                {isOpen && allSuggestions.length > 0 && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 w-full mt-2 bg-white border border-neutral-200 rounded-lg shadow-xl overflow-hidden max-h-60 overflow-y-auto"
                    >
                        {allSuggestions.map((suggestion, index) => (
                            <li
                                key={suggestion.slug === 'custom' ? `custom-${suggestion.name}` : suggestion.slug}
                                onClick={() => handleSelect(suggestion)}
                                className={`px-4 py-3 cursor-pointer transition-colors border-b border-neutral-50 last:border-b-0 ${selectedIndex === index ? 'bg-primary-50 text-primary-700' : 'hover:bg-neutral-50 text-neutral-700'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="font-medium">{suggestion.name}</div>
                                    {suggestion.slug === 'custom' && (
                                        <span className="text-[10px] uppercase tracking-wider font-bold bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded">
                                            Custom
                                        </span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}
