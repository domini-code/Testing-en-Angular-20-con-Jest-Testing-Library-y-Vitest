import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FeedbackForm } from './feedback-form';

const mockSizes = ['S', 'M', 'L', 'XL', 'XXL'];

describe('FeedbackForm', () => {
  let component: FeedbackForm;
  let fixture: ComponentFixture<FeedbackForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackForm, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackForm);
    component = fixture.componentInstance;
  });

  describe('@Input()', () => {
    it('Receives and assings the shirtSizes array correctly', () => {
      // Arrange

      // Act
      component.shirtSizes = mockSizes;

      // Assert
      expect(component.shirtSizes).toEqual(mockSizes);
      expect(component.shirtSizes.length).toBe(5);
    });

    // it('Shows the received shirt sizes in the select', async () => {
    //   await render(FeedbackForm, {
    //     imports: [ReactiveFormsModule],
    //     inputs: { shirtSizes: mockSizes },
    //   });

    //   mockSizes.forEach((size) => {
    //     expect(screen.getByRole('option', { name: size })).toBeInTheDocument();
    //   });

    //   expect(screen.getAllByRole('option')).toHaveLength(mockSizes.length);
    // });
  });

  describe('@Output', () => {
    it('Emits the form values when submit() is called', () => {
      const submitSpy = jest.spyOn(component.submitForm, 'emit');

      fixture.detectChanges();

      const formData = {
        name: 'Dominicode',
        shirtSize: 'M',
      };

      component.form.setValue(formData);

      component.submit();

      // Assert
      // expect(submitSpy).toHaveBeenCalled();
      expect(submitSpy).toHaveBeenCalledWith(formData);
    });
  });
});
