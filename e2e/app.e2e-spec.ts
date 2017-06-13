import { PopappPage } from './app.po';

describe('popapp App', () => {
  let page: PopappPage;

  beforeEach(() => {
    page = new PopappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
