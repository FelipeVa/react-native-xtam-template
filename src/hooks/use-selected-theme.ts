import React from 'react';
import { useColorScheme } from 'react-native';
import { useMMKVString } from 'react-native-mmkv';

import { storage } from '@/lib/storage';

const SELECTED_THEME = 'SELECTED_THEME';
export type ColorSchemeType = 'light' | 'dark';
/**
 * this hooks should only be used while selecting the theme
 * This hooks will return the selected theme which is stored in MMKV
 * selectedTheme should be one of the following values 'light', 'dark' or 'system'
 * don't use this hooks if you want to use it to style your component based on the theme use useColorScheme from nativewind instead
 *
 */
export const useSelectedTheme = () => {
  const colorScheme = useColorScheme();
  const [theme, _setTheme] = useMMKVString(SELECTED_THEME, storage);

  const setSelectedTheme = React.useCallback(
    (t: ColorSchemeType) => {
      _setTheme(t);
    },
    [_setTheme]
  );

  const selectedTheme = (
    theme && theme === 'system' ? colorScheme : theme ? theme : colorScheme
  ) as ColorSchemeType;

  return { selectedTheme, setSelectedTheme } as const;
};
