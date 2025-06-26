import { render, screen } from '@testing-library/angular';
import { App } from './app';

describe('App', () => {
  it('Renders the title', async () => {
    // Arrange & Act
    await render(App);

    // Assert
    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toHaveTextContent('Hello, dominicode');
  });
});
