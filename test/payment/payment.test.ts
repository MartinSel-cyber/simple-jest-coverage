import { PaymentService } from '../../src/payment/payment'

describe('PaymentService', () => {
  let Payment: PaymentService

  beforeEach(() => {
    Payment = new PaymentService(100)
  })

  describe('constructor', () => {
    test('throws error when amount is 0', () => {
      expect(() => new PaymentService(0)).toThrow()
    })

    test('throws error when amount is negative', () => {
      expect(() => new PaymentService(-1)).toThrow()
    })
  })

  describe('applyDiscount', () => {
    test('applies a discount to the current amount', () => {
      Payment.applyDiscount(20)

      expect((Payment as any).amount).toBe(80)
    })

    test('does not change amount with invalid discount', () => {
      Payment.applyDiscount(-10)

      expect((Payment as any).amount).toBe(100)
    })

    test('applies 100 percent discount', () => {
      Payment.applyDiscount(100)

      expect((Payment as any).amount).toBe(0)
    })

    test('does not change amount when discount is over 100', () => {
      Payment.applyDiscount(150)

      expect((Payment as any).amount).toBe(100)
    })

    test('does not apply discount after payment', () => {
      Payment.pay()
      Payment.applyDiscount(20)

      expect((Payment as any).amount).toBe(100)
    })
    test('does not change amount with 0 percent discount', () => {
      Payment.applyDiscount(0)
      expect((Payment as any).amount).toBe(100)
    })
  })

  describe('pay', () => {
    test('returns true when payment is made for the first time', () => {
      expect(Payment.pay()).toBe(true)
    })

    test('returns false when payment is already completed', () => {
      Payment.pay()

      expect(Payment.pay()).toBe(false)
    })
  })
})
