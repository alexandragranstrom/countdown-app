import { FitTextDirective } from './fit-text.directive'

describe('FitTextDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = { nativeElement: document.createElement('div') }
    const directive = new FitTextDirective(mockElementRef as any)
    expect(directive).toBeTruthy()
  })
})
