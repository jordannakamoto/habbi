import "react-native-url-polyfill/auto";

import * as QueryParams from 'expo-auth-session/build/QueryParams'
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from 'expo-web-browser';

import React, { useEffect, useState } from "react";

import { SupabaseContext } from "./SupabaseContext";
import { createClient } from "@supabase/supabase-js";
// Oauth Session
import { makeRedirectUri } from 'expo-auth-session';

//
// # WARN  Value being stored in SecureStore is larger than 2048 bytes and it may not be stored successfully. In a future SDK version, this call may throw an error.
// # Try another storage provider from Supabase/React Native documentation
const ExpoSecureStoreAdapter = {
  getItem: (key) => SecureStore.getItemAsync(key),
  setItem: (key, value) => SecureStore.setItemAsync(key, value),
  removeItem: (key) => SecureStore.deleteItemAsync(key),
};

export const SupabaseProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isNavigationReady, setNavigationReady] = useState(false);
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState([]);

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
      auth: {
        storage: ExpoSecureStoreAdapter,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    }
  );

  // --- User Goals --- //
  const createGoal = async (title, category, description) => {
    if (!user) return;
    const { data, error } = await supabase
      .from('Goals')
      .insert([{ user_id: user.id, title, category, description }])
      .select() // will ensure the created goal is returned with an id
      .single();
    if (error) throw error;
    setGoals([...goals, data]);
  };

  const updateGoal = async (id, title, category, description) => {
    const { data, error } = await supabase
      .from('Goals')
      .update({ title, category, description })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    setGoals(goals.map((goal) => (goal.id === id ? data : goal)));
  };

  const fetchGoals = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('Goals')
      .select('*')
      .eq('user_id', user.id);
    if (error) throw error;
    setGoals(data);
  };

  useEffect(() => {
    if (user) {
      fetchGoals();
    }
  }, [user]);

  // --- Account Management --- //
  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    setLoggedIn(true);
  };

  const register = async (email, password) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  };

  const forgotPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setLoggedIn(false);
  };

  const checkIfUserIsLoggedIn = async () => {
    const result = await supabase.auth.getSession();
    setUser(result.data.session?.user ?? null);
    setLoggedIn(result.data.session !== null);
    setNavigationReady(true);
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  // ----- Login Screen OAuth ----- //
  const redirectTo = makeRedirectUri();

  const createSessionFromUrl = async (url) => {
    const { params, errorCode } = QueryParams.getQueryParams(url);

    if (errorCode) throw new Error(errorCode);
    const { access_token, refresh_token } = params;

    if (!access_token) return;

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    if (error) throw error;
    return data.session;
  };
  
  const performOAuth = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });
    if (error) throw error;

    const res = await WebBrowser.openAuthSessionAsync(data?.url ?? '', redirectTo);

    if (res.type === 'success') {
      const { url } = res;
      await createSessionFromUrl(url);
    }
  };

  // # Not Used
  const sendMagicLink = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email: 'example@email.com',
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) throw error;
    // Email sent.
  };
  // --- end login screen

  return (
    <SupabaseContext.Provider
      value={{ isLoggedIn, user, goals, createGoal, updateGoal, login, register, forgotPassword, logout, createSessionFromUrl, performOAuth, sendMagicLink }}
    >
      {isNavigationReady ? children : null}
    </SupabaseContext.Provider>
  );
};
