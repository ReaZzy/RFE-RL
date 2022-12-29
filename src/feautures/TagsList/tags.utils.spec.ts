import { getTagsFromUrlHash } from '@src/feautures/TagsList/tags.utils';

describe('getTagsFromUrlHash', () => {
  it('Should be defined', () => {
    expect(getTagsFromUrlHash).toBeDefined();
  });
  it('Should return empty array when we don`t have tags', () => {
    const act = getTagsFromUrlHash('https://localhost/');
    expect(act).toHaveLength(0);
  });
  it('Should return array with length 3', () => {
    const act = getTagsFromUrlHash('https://localhost/#tags=1,2,3');
    expect(act).toEqual(['1', '2', '3']);
  });
  it('Should work recursively', () => {
    const act = getTagsFromUrlHash(
      'https://localhost/#tags=1,2,3#tags=1,2,3#tags=1,2,3',
    );
    expect(act).toEqual(['1', '2', '3', '1', '2', '3', '1', '2', '3']);
  });
  it('Should split only comas', () => {
    const act = getTagsFromUrlHash('https://localhost/#tags=1.2,3');
    expect(act).toEqual(['1.2', '3']);
  });
  it('Should return empty array when tags are empty', () => {
    const act = getTagsFromUrlHash('https://localhost/#tags=');
    expect(act).toEqual([]);
  });
  it('Should extract only tags', () => {
    const act = getTagsFromUrlHash(
      'https://localhost/#tags=1,2#tag=1,2#ll=1,2',
    );
    expect(act).toEqual(['1', '2']);
  });
});
