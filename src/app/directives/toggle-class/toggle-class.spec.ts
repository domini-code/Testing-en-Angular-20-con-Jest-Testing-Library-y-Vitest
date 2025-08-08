import { Component, input } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { ToggleClass, ToggleMode } from './toggle-class';

@Component({
  template: `
    <div data-testid="basic-toggle" [toggleMode]="toggleMode()" appToggleClass>
      Basic Toggle
    </div>
  `,
  imports: [ToggleClass],
})
class BasicTestHostComponent {
  toggleMode = input<ToggleMode>('multiple');
}

@Component({
  template: `
    <div
      data-testid="multi-toggle"
      toggleClass="class1 class2 class3"
      appToggleClass
    >
      Multiple Classes Toggle
    </div>
  `,
  imports: [ToggleClass],
})
class MultiClassTestHostComponent {}

describe('ToggleClass', () => {
  describe('Basic Toggle', () => {
    const setupBasic = async () => {
      await render(BasicTestHostComponent);
      return {
        getElement: () => screen.getByTestId('basic-toggle'),
      };
    };

    it('Apply "active" class by default when click', async () => {
      const { getElement } = await setupBasic();
      const element = getElement();

      await userEvent.click(element);

      expect(element).toHaveClass('active');
      expect(element).toHaveAttribute('data-toggle-active', 'true');
      expect(element).toHaveAttribute('aria-pressed', 'true');
    });

    it('Remove "active" class when click again', async () => {
      const { getElement } = await setupBasic();
      const element = getElement();

      await userEvent.click(element);
      expect(element).toHaveClass('active');

      await userEvent.click(element);

      expect(element).not.toHaveClass('active');
      expect(element).toHaveAttribute('data-toggle-active', 'false');
      expect(element).toHaveAttribute('aria-pressed', 'false');
    });
  });
});
