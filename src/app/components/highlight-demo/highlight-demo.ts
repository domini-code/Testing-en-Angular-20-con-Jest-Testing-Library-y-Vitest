import {
  Component,
  signal
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { ToggleClass, ToggleStateChange } from '../../directives/toggle-class/toggle-class';

@Component({
  selector: 'app-highlight-demo',
  imports: [ReactiveFormsModule, FormsModule, ToggleClass],
  templateUrl: './highlight-demo.html',
  styleUrl: './highlight-demo.scss',
})
export class HighlightDemo {
  activeTab = signal<string>('toggle');

  highlightColor = signal('#ffeb3b');
  defaultColor = signal('#ffffff');
  triggerEvent = signal<'hover' | 'click' | 'focus'>('hover');
  animationSpeed = signal<'slow' | 'normal' | 'fast'>('normal');
  disabled = signal(false);

  toggleClass = signal('custom-active');
  toggleTriggerEvent = signal<
    'click' | 'dblclick' | 'mouseenter' | 'focus' | 'keydown'
  >('click');

  toggleInitialState = signal(false);
  toggleDisabled = signal(false);
  toggleMode = signal<'single' | 'multiple'>('multiple');
  selectedPreventCondition = signal('');
  preventConditions = signal<string[]>([]);

  totalHighlights = signal(0);
  totalToggles = signal(0);
  toggleEvents: ToggleStateChange[] = [];

  getHighlightInteractionText(): string {
    const trigger = this.triggerEvent();
    const disabled = this.disabled();

    if (disabled) return '🚫 Directive disabled';

    switch (trigger) {
      case 'hover':
        return '🖱️ Hover me';
      case 'click':
        return '🖱️ Click me';
      case 'focus':
        return '🎯 Focus me (tab or click)';
      default:
        return 'Interact with me';
    }
  }

  getToggleInteractionText(): string {
    const trigger = this.toggleTriggerEvent();
    const disabled = this.toggleDisabled();

    if (disabled) return '🚫 Toggle deshabilitado';

    switch (trigger) {
      case 'click':
        return '🖱️ Click to toggle';
      case 'dblclick':
        return '🖱️ Double click to toggle';
      case 'mouseenter':
        return '🖱️ Hover to toggle';
      case 'focus':
        return '🎯 Focus to toggle';
      case 'keydown':
        return '⌨️ Enter/Space to toggle';
      default:
        return 'Interact to toggle';
    }
  }

  updateConfig(): void {
    this.totalHighlights.update((count) => count + 1);
  }

  updatePreventConditions(): void {
    const condition = this.selectedPreventCondition();
    if (condition) {
      this.preventConditions.set([condition]);
    } else {
      this.preventConditions.set([]);
    }
  }

  onToggleEvent(event: ToggleStateChange): void {
    this.toggleEvents.unshift(event);
    if (this.toggleEvents.length > 5) {
      this.toggleEvents = this.toggleEvents.slice(0, 5);
    }
    this.totalToggles.update((count) => count + 1);
  }

  onCardToggle(event: ToggleStateChange): void {
    console.log('Card toggled:', event);
  }

  getToggleState(): string {
    if (this.toggleEvents.length === 0) return 'No activity';
    return this.toggleEvents[0].isActive ? 'Active' : 'Inactive';
  }

  getActiveClasses(): string {
    if (this.toggleEvents.length === 0) return 'None';
    const classes = this.toggleEvents[0].activeClasses;
    return classes.length > 0 ? classes.join(', ') : 'None';
  }

  getRecentEvents(): string {
    if (this.toggleEvents.length === 0) return 'None';
    return this.toggleEvents
      .slice(0, 3)
      .map((e) => e.triggerEvent)
      .join(', ');
  }

}
