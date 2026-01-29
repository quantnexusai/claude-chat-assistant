'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from './supabase'
import { isDemoMode, demoUser, demoProfile } from './demo-data'
import type { Profile } from './types'

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: Profile | null
  loading: boolean
  isDemo: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDemo, setIsDemo] = useState(false)

  useEffect(() => {
    if (isDemoMode()) {
      setIsDemo(true)
      setUser(demoUser as unknown as User)
      setProfile(demoProfile)
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId: string) => {
    if (isDemo) {
      setProfile(demoProfile)
      return
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (!error && data) {
      setProfile(data)
    }
  }

  const signIn = async (email: string, password: string) => {
    if (isDemo) {
      setUser(demoUser as unknown as User)
      setProfile(demoProfile)
      return { error: null }
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error as Error | null }
  }

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    if (isDemo) {
      setUser(demoUser as unknown as User)
      setProfile({ ...demoProfile, first_name: firstName || 'Demo', last_name: lastName || 'User' })
      return { error: null }
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        }
      }
    })

    if (!error && data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        email,
        first_name: firstName || null,
        last_name: lastName || null,
        avatar_color: '#2D5BFF',
        status: 'online',
        theme: 'light',
      })
    }

    return { error: error as Error | null }
  }

  const signOut = async () => {
    if (isDemo) {
      setUser(null)
      setProfile(null)
      return
    }

    await supabase.auth.signOut()
    setProfile(null)
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (isDemo) {
      setProfile((prev) => prev ? { ...prev, ...updates } : null)
      return { error: null }
    }

    if (!user) return { error: new Error('No user logged in') }

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)

    if (!error) {
      setProfile((prev) => prev ? { ...prev, ...updates } : null)
    }

    return { error: error as Error | null }
  }

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      loading,
      isDemo,
      signIn,
      signUp,
      signOut,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
