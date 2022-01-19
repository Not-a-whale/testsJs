const CancelablePromise = require('./cancelable-promise');

describe('CancelablePromise test', () => {
    test('throws on wrong constructor arguments', () => {
      expect(() => new CancelablePromise()).toThrowError()
      expect(() => new CancelablePromise('wrong')).toThrowError()
    });
    test('create cancelable promise', () => {
        let isCompleted = false
        const promise = new CancelablePromise(() => isCompleted = true);
        expect(promise).toBeInstanceOf(CancelablePromise)
        expect(isCompleted).toBe(true)
      });
    test('resolving', async () => {
    const unique = Symbol()
    const promise = new CancelablePromise(resolve => setTimeout(() => resolve(unique)))
    await expect(promise).resolves.toBe(unique)
    });
    test('rejecting', async () => {
        const unique = Symbol()
        const promise = new CancelablePromise((resolve, reject) => setTimeout(() => reject(unique)))
        await expect(promise).rejects.toBe(unique)
      });
});

describe('CancelablePromise test', () => {
    test('throws on wrong argument', () => {
        const promise = new CancelablePromise(() => void 0)
        expect(() => promise.then('wrong')).toThrowError()
      })

      test('then(onFulfilled)', async () => {
        const initValue = 10
        const multiplier = 2
        const onFulfilled = value => value * multiplier
  
        const cp = new CancelablePromise(resolve => resolve(initValue))
        const cp2 = cp.then(v => {
          return new Promise(resolve => setTimeout(() => resolve(onFulfilled(v))))
        })
  
  
        expect(cp).not.toBe(cp2)
        expect(cp2).toBeInstanceOf(CancelablePromise)
        getPromiseState(cp2, state => expect(state).toBe('pending'))
        await expect(cp).resolves.toBe(initValue)
        await expect(cp2).resolves.toBe(onFulfilled(initValue))
      })
  
})






























// const { generateText, checkAndGenerate } = require('./util');
// const puppeteer = require('puppeteer');

// test('should output name and age', () => {
//     const text = generateText('max', 29);
//     expect(text).toBe('max (29 years old)');
//     const text2 = generateText('Anna', 28);
//     expect(text2).toBe('Anna (28 years old)')
// });

// test('should output data-less text', () => {
//     const text = generateText('', null);
//     expect(text).toBe(' (null years old)')
// });

// test('should generate a valid text output', () => {
//     const text = checkAndGenerate('Max', 29);
//     expect(text).toBe('Max (29 years old)');
// });

// test('should click around', async () => {
//     const browser = await puppeteer.launch({
//         headless: false,
//         slowMo: 80,
//         args: ['--window-size=1920,1080']
//     });
//     const page = await browser.newPage(); 
//     page.goto('C:/Users/sabao/Desktop/old laptop crap/Programming/Projects/testing/js-testing-introduction/index.html');
//     await page.click('input#name');
//     await page.type('input#name', 'Anna');
//     await page.click('input#age');
//     await page.type('input#age', 28);
//     await page.click('#btnAddUser');
// })