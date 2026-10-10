export class PaymentService {
  private amount: number = 0
  isPaid: boolean = false

  constructor(amount: number) {
    if (amount <= 0) {
      throw new Error('Amount must be greater than 0')
    }
    this.amount = amount
    this.isPaid = false
  }
  applyDiscount(percent:number) {
    if (percent < 0) {
      return
    }else if(percent > 100) {
      return
    }
    if (this.isPaid == true) {
      return
    }
    this.amount = this.amount - ( this.amount * percent / 100)
  }

  pay() {
    if (this.isPaid === true) {
      return false
    }
    this.isPaid = true
    return true
  }
}