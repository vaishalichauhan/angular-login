import * as storage from './storage';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface SessionState {
  token: string;
  name: string;
}
export function createInitialSessionState(): SessionState {
  return {
    token: null,
    name: null,
    ...storage.getSession(),
  }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {
  constructor() {
    super(createInitialSessionState());
  }

  login(session: SessionState) {
    this.update(session);
    storage.saveSession(session);
  }

  logout() {
    storage.clearSession();
    this.update(createInitialSessionState());
  }
}
