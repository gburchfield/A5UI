import { A5Page } from './app.po';

describe('a5 App', () => {
  let page: A5Page;

  beforeEach(() => {
    page = new A5Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
