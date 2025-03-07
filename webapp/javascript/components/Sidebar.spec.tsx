import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import uiReducer from '@pyroscope/redux/reducers/ui';

import { Sidebar2 } from './Sidebar';

// TODO: figure out the types here
function createStore(preloadedState: any) {
  const store = configureStore({
    reducer: {
      ui: uiReducer,
    },
    preloadedState,
  });

  return store;
}

describe('Sidebar', () => {
  const currentUser = { role: 'anonymous' };
  describe('active routes highlight', () => {
    describe.each([
      ['/', 'sidebar-continuous-single'],
      ['/comparison', 'sidebar-continuous-comparison'],
      ['/comparison-diff', 'sidebar-continuous-diff'],
    ])('visiting route %s', (a, b) => {
      describe('collapsed', () => {
        test(`should have menuitem ${b} active`, () => {
          render(
            <MemoryRouter initialEntries={[a]}>
              <Provider
                store={createStore({
                  ui: {
                    sidebar: {
                      state: 'pristine',
                      collapsed: true,
                    },
                  },
                })}
              >
                <Sidebar2 currentUser={currentUser} />
              </Provider>
            </MemoryRouter>
          );

          // it should be active
          expect(screen.getByTestId(b)).toHaveClass('active');
        });
      });

      describe('not collapsed', () => {
        test(`should have menuitem ${b} active`, () => {
          render(
            <MemoryRouter initialEntries={[a]}>
              <Provider
                store={createStore({
                  ui: {
                    sidebar: {
                      state: 'pristine',
                      collapsed: false,
                    },
                  },
                })}
              >
                <Sidebar2 currentUser={currentUser} />
              </Provider>
            </MemoryRouter>
          );

          // it should be active
          expect(screen.getByTestId(b)).toHaveClass('active');
        });
      });
    });
  });
});
