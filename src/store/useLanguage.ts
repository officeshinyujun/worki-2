import { create } from "zustand";

interface LanguageState {
    language: 'ko' | 'en';
    setLanguage: (language: 'ko' | 'en') => void;
}

const useLanguage = create<LanguageState>((set) => ({
    language: "ko",
    setLanguage: (language: 'ko' | 'en') => set({ language }),
}));

export default useLanguage;
