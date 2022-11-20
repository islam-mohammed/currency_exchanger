import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Injectable({ providedIn: 'root' })
export class WindowService {
  private _window: (WindowProxy & typeof globalThis) | null;
  constructor(@Inject(DOCUMENT) private _document: Document) {
    this._window = this._document.defaultView;
  }

  get window() {
    return this._window;
  }
}
