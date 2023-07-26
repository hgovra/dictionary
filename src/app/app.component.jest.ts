import { render, screen } from '@testing-library/angular';
import '@testing-library/jest-dom';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('criar o app', async () => {
    await render(AppComponent);

    const app = screen.getByTestId('app-root');

    expect(app).toBeInTheDocument();
  });
});
