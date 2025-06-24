import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('Renders the title', () => {
    //Arrange (organizar)
    const fixture = TestBed.createComponent(App);

    // Act (actuar)
    fixture.detectChanges();

    // Asset (afirmar)
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Hello, dominicode'
    );
  });
});
