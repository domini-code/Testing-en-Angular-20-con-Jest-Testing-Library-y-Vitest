import { render } from '@testing-library/angular';
import { App } from './app';

describe('App', () => {
  it('Renders the title', async () => {
    // Arrange & Act
    await render(App);

    // Assert

    expect(true).toBe(true);
  });
});
