import TagListItem from '@src/feautures/TagsList/TagListItem';
import { render } from '@src/utils/tests/test-utils';

describe('<TagListItem />', () => {
  it('Should be defined', () => {
    expect(TagListItem).toBeDefined();
  });
  it('Should match snapshot', () => {
    const { asFragment } = render(<TagListItem tag="TEST" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
