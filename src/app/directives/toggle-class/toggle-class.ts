import {
  computed,
  Directive,
  HostBinding,
  HostListener,
  input,
  OnDestroy,
  output,
  signal,
} from '@angular/core';

type TriggerEvent = 'click' | 'dblclick' | 'mouseenter' | 'focus' | 'keydown';
export type ToggleMode = 'single' | 'multiple';

export interface ToggleStateChange {
  isActive: boolean;
  activeClasses: string[];
  element: HTMLElement;
  triggerEvent: string;
}

@Directive({
  selector: '[appToggleClass]',
})
export class ToggleClass implements OnDestroy {
  toggleClass = input<string>('active');
  triggerEvent = input<TriggerEvent>('click');
  initialState = input<boolean>(false);
  disabled = input<boolean>(false);
  toggleMode = input<ToggleMode>('single');
  preventToggleWhen = input<string[]>([]);

  toggled = output<ToggleStateChange>();

  private isActive = signal(false);
  private keyPressed = signal<string>('');

  private classesToToggle = computed(() => {
    const classes = this.toggleClass();
    return classes.split(/\s+/).filter((cls) => cls.trim().length > 0);
  });

  currentClasses = computed(() => {
    if (!this.isActive()) return [];
    return this.classesToToggle();
  });

  @HostBinding('class')
  get appliedClasses(): string {
    if (this.disabled()) return '';
    return this.currentClasses().join(' ');
  }

  @HostBinding('attr.data-toggle-active')
  get toggleActiveAttribute(): string {
    return this.isActive().toString();
  }

  @HostBinding('attr.data-toggle-disabled')
  get toggleDisabledAttribute(): string | null {
    return this.disabled() ? 'true' : null;
  }

  @HostBinding('attr.aria-pressed')
  get ariaPressed(): string {
    return this.isActive().toString();
  }

  ngOnDestroy(): void {
    this.keyPressed.set('');
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (this.triggerEvent() === 'click') {
      this._handleToggle(event, 'click');
    }
  }

  @HostListener('dblclick', ['$event'])
  onDoubleClick(event: MouseEvent): void {
    if (this.triggerEvent() === 'dblclick') {
      this._handleToggle(event, 'dblclick');
    }
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent): void {
    if (this.triggerEvent() === 'mouseenter') {
      this._handleToggle(event, 'mouseenter');
    }
  }

  @HostListener('focus', ['$event'])
  onFocus(event: FocusEvent): void {
    if (this.triggerEvent() === 'focus') {
      this._handleToggle(event, 'focus');
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.triggerEvent() === 'keydown') {
      this.keyPressed.set(event.key);

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this._handleToggle(event, 'keydown');
      }
    }
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent): void {
    if (
      this.triggerEvent() === 'mouseenter' &&
      this.toggleMode() === 'single'
    ) {
      this._setInactive(event);
    }
  }

  @HostListener('blur', ['$event'])
  onBlur(event: FocusEvent): void {
    if (this.triggerEvent() === 'focus' && this.toggleMode() === 'single') {
      this._setInactive(event);
    }
  }

  public toggle(triggerEvent?: string): boolean {
    if (this.disabled()) return this.isActive();

    const newState = !this.isActive();
    this.isActive.set(newState);
    this._emitToggleEvent(triggerEvent || 'programmatic');
    return newState;
  }

  public activate(triggerEvent?: string): void {
    if (this.disabled()) return;

    if (!this.isActive()) {
      this.isActive.set(true);
      this._emitToggleEvent(triggerEvent || 'programmatic');
    }
  }

  public deactivate(triggerEvent?: string): void {
    if (this.disabled()) return;

    if (this.isActive()) {
      this.isActive.set(false);
      this._emitToggleEvent(triggerEvent || 'programmatic');
    }
  }

  public getCurrentState(): boolean {
    return this.isActive();
  }

  public getActiveClasses(): string[] {
    return this.currentClasses();
  }

  public hasClass(className: string): boolean {
    return this.currentClasses().includes(className);
  }

  private _handleToggle(event: Event, triggerType: string): void {
    if (this.disabled()) return;

    if (this._shouldPreventToggle(event)) return;

    if (this.toggleMode() === 'single') {
      this._setActive(event, triggerType);
    } else {
      this.toggle(triggerType);
    }
  }

  private _setActive(event: Event, triggerType: string): void {
    if (!this.isActive()) {
      this.isActive.set(true);
      this._emitToggleEvent(triggerType, event);
    }
  }

  private _setInactive(event: Event): void {
    if (this.isActive()) {
      this.isActive.set(false);
      this._emitToggleEvent('auto-deactivate', event);
    }
  }

  private _shouldPreventToggle(event: Event): boolean {
    const preventConditions = this.preventToggleWhen();

    for (const condition of preventConditions) {
      switch (condition) {
        case 'ctrlKey':
          if ((event as KeyboardEvent | MouseEvent).ctrlKey) return true;
          break;
        case 'shiftKey':
          if ((event as KeyboardEvent | MouseEvent).shiftKey) return true;
          break;
        case 'altKey':
          if ((event as KeyboardEvent | MouseEvent).altKey) return true;
          break;
        case 'rightClick':
          if ((event as MouseEvent).button === 2) return true;
          break;
      }
    }

    return false;
  }

  private _emitToggleEvent(triggerType: string, event?: Event): void {
    const element = (event?.target as HTMLElement) || null;

    this.toggled.emit({
      isActive: this.isActive(),
      activeClasses: this.currentClasses(),
      element: element!,
      triggerEvent: triggerType,
    });
  }
}
