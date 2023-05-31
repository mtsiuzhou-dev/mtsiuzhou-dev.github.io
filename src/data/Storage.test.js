import Storage from './Storage';
import { LocalStorageKey } from '../constants/Keys';

describe('Storage:', () => {
  const testData = Object.freeze({ data: 'test data' });
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };
  Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
  });

  test('should have expected functions', () => {
    expect(Storage.save).toBeDefined();
    expect(Storage.load).toBeDefined();
  });

  test('should save serialized data', () => {
    Storage.save(testData);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      LocalStorageKey,
      JSON.stringify(testData)
    );
  });

  test('should load unserialized data', () => {
    localStorageMock.getItem.mockImplementationOnce(() =>
      JSON.stringify(testData)
    );

    const result = Storage.load();

    expect(localStorageMock.getItem).toHaveBeenCalled();
    expect(result).toEqual(testData);
  });
});
