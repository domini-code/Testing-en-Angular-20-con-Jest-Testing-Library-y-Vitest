import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { Button } from './button';

describe('Button', () => {
  // it('Button in the document', async () => {
  //   await render(`
  //     <app-button>
  //     Haz clic aquí
  //     </app-button>`);
  //   expect(screen.getByText('Haz clic aquí')).toBeInTheDocument();
  // });

  it('Set the type attribute correctly according to the input', async () => {
    await render(Button, {
      inputs: { type: 'reset' },
    });

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'reset');
  });

  it('Emit buttonClick event when user press Enter', async () => {
    const submitFn = jest.fn();

    await render(Button, {
      inputs: { type: 'submit' },
      on: {
        buttonClick: submitFn,
      },
    });

    const button = screen.getByRole('button');
    button.focus();

    await userEvent.keyboard('{Enter}');

    expect(submitFn).toHaveBeenCalled();
  });

  it('Emit buttonClick event when user clicks the button', async () => {
    const submitFn = jest.fn();

    await render(Button, {
      inputs: { type: 'submit' },
      on: {
        buttonClick: submitFn,
      },
    });

    await userEvent.click(screen.getByRole('button'));

    expect(submitFn).toHaveBeenCalled();
  });
});
