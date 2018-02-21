import { renderComponent, expect } from '../test_helper';
import CommentBox from '../../src/components/comment_box';

describe('CommentBox', () => {
  it('Has the correct class', () => {
    const component = renderComponent(CommentBox);
    expect(component).to.have.class('comment-box');
  })
  it('Has a text area', () => {
    const component = renderComponent(CommentBox);
    expect(component.find('textarea')).to.exist;
  });
  it('Has a button', () => {
    const component = renderComponent(CommentBox);
    expect(component.find('button')).to.exist;
  });
});
